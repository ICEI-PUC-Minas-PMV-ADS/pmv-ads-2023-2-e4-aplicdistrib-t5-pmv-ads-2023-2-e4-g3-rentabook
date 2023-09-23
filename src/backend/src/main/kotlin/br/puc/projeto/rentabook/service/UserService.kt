package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.exception.InvalidLoginException
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.exception.ResourceAlreadyExistsException
import br.puc.projeto.rentabook.mapper.AddressFormMapper
import br.puc.projeto.rentabook.mapper.PrivateUserViewMapper
import br.puc.projeto.rentabook.mapper.PublicUserViewMapper
import br.puc.projeto.rentabook.mapper.RegisterFormMapper
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.AddressRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.security.JWTUtils
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
    private val addressRepository: AddressRepository
) {

    fun getPublicUser(id: String): PublicUserView {
        return userRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Usuário não encontrado")
            publicUserViewMapper.map(this)
        }
    }

    fun getPrivateUser(): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            privateUserViewMapper.map(this)
        }
    }

    fun <R> checkDuplicatedEmail(email: String, block: () -> R): R {
        userRepository.findByEmail(email)?.let { throw Exception("Este email já esta em uso!") }
        return block()
    }

    fun register(form: RegisterForm): User {
        return registerFormMapper.map(form).run {
            userRepository.save(this)
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
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            userImage = imageService.uploadImage(image)
            userRepository.save(this).run {
                privateUserViewMapper.map(this)
            }
        }
    }

    fun deleteUserImage(): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            val imageId = this.userImage ?: throw NotFoundException("Usuário não possuí imagem de perfil")
            imageService.deleteImage(imageId.id as String)
            userImage = null
            userRepository.save(this).run {
                privateUserViewMapper.map(this)
            }
        }
    }

    fun registerAddress(form: AddressForm): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication

        return addressRepository.save(addressFormMapper.map(form)).let { address ->
            userRepository.findByEmail(authentication.name).run {
                this ?: throw Exception("Usuário autenticado não encontrado")
                addresses.add(address)
                userRepository.save(this).run {
                    privateUserViewMapper.map(this)
                }
            }
        }
    }

    fun deleteAddress(id: String): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication

        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            val findedAddress = addresses.find { address ->
                address?.id == id
            }
            if (findedAddress != null){
                this.addresses.remove(findedAddress)
                addressRepository.deleteById(id)
            } else throw NotFoundException("Endereço não encontrado!")

            userRepository.save(this).run {
                privateUserViewMapper.map(this)
            }
        }
    }

    fun updatePassword(form: UpdatePasswordForm): User{
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            val oldPasswordValidate = BCryptPasswordEncoder().matches(form.oldPassword, password)
            if (email == form.email && oldPasswordValidate){
                password = BCryptPasswordEncoder().encode(form.newPassword)
            } else throw InvalidLoginException("Login inválido")
            userRepository.save(this)
        }
    }

    fun registerBook(id: String): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            val findedBook = booksId.find { book ->
                book == id
            }
            if (findedBook == null){
                booksId.add(id)
            } else throw ResourceAlreadyExistsException("Esse livro já foi cadastrado!")
                userRepository.save(this).run {
                    privateUserViewMapper.map(this)
                }
            }
    }

    fun deleteBook(id: String): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            val findedBook = booksId.find { book ->
                book == id
            }
            if (findedBook != null){
                booksId.remove(findedBook)
            } else throw NotFoundException("Livro não encontrado!")
            userRepository.save(this).run {
                privateUserViewMapper.map(this)
            }
        }
    }

    fun updateUserProfile(updateProfileForm: UpdateProfileForm): PrivateUserView {
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            this.name =  updateProfileForm.name
            userRepository.save(this).run {
                privateUserViewMapper.map(this)
            }
        }
    }
}