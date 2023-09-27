package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.exception.InvalidLoginException
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
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

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
) {

    fun getPublicUser(id: String): PublicUserView {
        return userRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Usuário não encontrado")
            publicUserViewMapper.map(this)
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
        userRepository.findByEmail(username) ?: throw InvalidLoginException("Login inválido")
        val token = UsernamePasswordAuthenticationToken(username, password)
        val authResult: Authentication = authManager.authenticate(token)
        val user = authResult.principal as UserDetail
        return ResponseLoginView(jwtUtils.generateToken(user.username, user.authorities))
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
            val imageId = user.userImage ?: throw NotFoundException("Usuário não possuí imagem de perfil")
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
            } else throw InvalidLoginException("Login inválido")
            userRepository.save(user)
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
}