package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.exception.InvalidLoginException
import br.puc.projeto.rentabook.exception.InvalidTokenException
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.exception.ResourceAlreadyExistsException
import br.puc.projeto.rentabook.mapper.*
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.AddressRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.security.JWTUtils
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.*
import kotlin.random.Random

@Service
class UserService(
    private val userRepository: UserRepository,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val imageService: ImageService,
    private val registerFormMapper: RegisterFormMapper,
    private val authManager: AuthenticationManager,
    private val jwtUtils: JWTUtils,
    private val privateUserViewMapper: PrivateUserViewMapper,
    private val addressFormMapper: AddressFormMapper,
    private val addressRepository: AddressRepository,
    private val addressViewMapper: AddressViewMapper,
    private val emailService: EmailService
) {

    fun getPublicUser(id: String): PublicUserView {
        return userRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Usuário não encontrado")
            publicUserViewMapper.map(this)
        }
    }

    fun invalidateToken(){
        return AuthenticationUtils.authenticate(userRepository) { user ->
            user.tokenVersion++
            userRepository.save(user)
        }
    }

    fun getPrivateUser(): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            privateUserViewMapper.map(user)
        }
    }

    fun <R> checkDuplicatedEmail(email: String, block: () -> R): R {
        userRepository.findByEmail(email)?.let { throw Exception("Este email já esta em uso!") }
        return block()
    }

    fun register(form: RegisterForm): User {
        return checkDuplicatedEmail(form.email) {
            registerFormMapper.map(form).run {
                userRepository.save(this)
            }
        }
    }

    fun authenticateAndGenerateToken(username: String, password: String): ResponseLoginView {
        return userRepository.findByEmail(username).run {
            this ?: throw InvalidLoginException("Login inválido")
            val token = UsernamePasswordAuthenticationToken(username, password)
            val authResult: Authentication = authManager.authenticate(token)
            val user = authResult.principal as UserDetail
            ResponseLoginView(jwtUtils.generateToken(user.username, user.authorities, this.tokenVersion))
        }
    }

    fun updateUserImage(image: MultipartFile): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            user.userImage = imageService.uploadImage(image)
            userRepository.save(user).run {
                privateUserViewMapper.map(user)
            }
        }
    }

    fun deleteUserImage(): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val imageId = user.userImage ?: throw NotFoundException("Usuário não possui imagem de perfil")
            imageService.deleteImage(imageId.id as String)
            user.userImage = null
            userRepository.save(user).run {
                privateUserViewMapper.map(user)
            }
        }
    }

    fun registerAddress(form: AddressForm): AddressView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            addressRepository.save(addressFormMapper.map(form)).let { address ->
                user.addresses.add(address)
                userRepository.save(user).run {
                    addressViewMapper.map(address)
                }
            }
        }
    }

    fun deleteAddress(id: String): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val findedAddress = user.addresses.find { address ->
                address?.id == id
            }
            if (findedAddress != null) {
                user.addresses.remove(findedAddress)
                addressRepository.deleteById(id)
            } else throw NotFoundException("Endereço não encontrado!")
            userRepository.save(user).run {
                privateUserViewMapper.map(user)
            }
        }
    }

    fun updatePassword(form: UpdatePasswordForm): User {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val oldPasswordValidate = BCryptPasswordEncoder().matches(form.oldPassword, user.password)
            if (user.email == form.email && oldPasswordValidate) {
                user.password = BCryptPasswordEncoder().encode(form.newPassword)
                user.tokenVersion++
            } else throw InvalidLoginException("Login inválido")
            userRepository.save(user)
        }
    }

    fun sendRecoveryPassword(email: String) {
        findByEmail(email).run {
            passwordRecoveryToken = Random.nextInt(100000, 999999).toString()
            passwordRecoveryExpiration = Date(System.currentTimeMillis() + 900000)
            userRepository.save(this).run {
                val subject = "Código de recuperação de senha"
                val body = "Seu código de recuperação de senha é $passwordRecoveryToken"
                emailService.emailSender(toEmail = email, subject = subject, body = body)
            }
        }
    }

    fun recoveryPassword(form: RecoveryPasswordForm) {
        findByEmail(form.email).run {
            passwordRecoveryExpiration ?: throw NotFoundException("Código de verificação inválido!")
            passwordRecoveryToken ?: throw Exception("Código de verificação inválido!")
            if (form.verificationCode != passwordRecoveryToken) throw InvalidTokenException("Código de verificação inválido!")
            if(Date(System.currentTimeMillis()) > passwordRecoveryExpiration!!) throw InvalidTokenException("Código de verificação expirado!")
            password = BCryptPasswordEncoder().encode(form.newPassword)
            tokenVersion++
            passwordRecoveryToken = null
            passwordRecoveryExpiration = null
            userRepository.save(this)
        }
    }

    fun registerBook(id: String): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val findedBook = user.booksId.find { book ->
                book == id
            }
            if (findedBook == null) {
                user.booksId.add(id)
            } else throw ResourceAlreadyExistsException("Esse livro já foi cadastrado!")

            userRepository.save(user).run {
                privateUserViewMapper.map(user)
            }
        }
    }

    fun deleteBook(id: String): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val findedBook = user.booksId.find { book ->
                book == id
            }
            if (findedBook != null) {
                user.booksId.remove(findedBook)
            } else throw NotFoundException("Livro não encontrado!")
            userRepository.save(user).run {
                privateUserViewMapper.map(user)
            }
        }
    }

    fun updateUserProfile(updateProfileForm: UpdateProfileForm): PrivateUserView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            user.name = updateProfileForm.name
            userRepository.save(user).run {
                privateUserViewMapper.map(user)
            }
        }
    }

    fun findById(id: String): User {
        return userRepository.findByIdOrNull(id) ?: throw NotFoundException("Usuário não encontrado!")
    }

    fun findByEmail(email: String?): User {
        return userRepository.findByEmail(email) ?: throw NotFoundException("Usuário não encontrado!")
    }
}