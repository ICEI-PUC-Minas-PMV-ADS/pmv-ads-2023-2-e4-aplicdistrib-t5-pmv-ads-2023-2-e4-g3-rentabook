package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.PrivateUserView
import br.puc.projeto.rentabook.dto.PublicUserView
import br.puc.projeto.rentabook.dto.RegisterForm
import br.puc.projeto.rentabook.dto.ResponseLoginView
import br.puc.projeto.rentabook.exception.InvalidLoginException
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.PrivateUserViewMapper
import br.puc.projeto.rentabook.mapper.PublicUserViewMapper
import br.puc.projeto.rentabook.mapper.RegisterFormMapper
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.security.JWTUtils
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class UserService (
    private val userRepository: UserRepository,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val imageService: ImageService,
    private val registerFormMapper: RegisterFormMapper,
    private val authManager: AuthenticationManager,
    private val jwtUtils: JWTUtils,
    private val privateUserViewMapper: PrivateUserViewMapper
){

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

    fun updateUserImage(image: MultipartFile): PrivateUserView{
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            userImage = imageService.uploadImage(image)
            userRepository.save(this).run {
                privateUserViewMapper.map(this)
            }
        }
    }

    fun deleteUserImage(): PrivateUserView{
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
}