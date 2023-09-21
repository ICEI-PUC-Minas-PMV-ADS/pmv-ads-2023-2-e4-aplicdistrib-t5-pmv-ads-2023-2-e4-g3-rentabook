package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.PublicUserView
import br.puc.projeto.rentabook.dto.RegisterForm
import br.puc.projeto.rentabook.dto.ResponseLoginView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.PublicUserViewMapper
import br.puc.projeto.rentabook.mapper.RegisterFormMapper
import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.RoleRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.security.JWTUtils
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.multipart.MultipartFile

@Service
class UserService (
    private val userRepository: UserRepository,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val imageService: ImageService,
    private val registerFormMapper: RegisterFormMapper,
    private val authManager: AuthenticationManager,
    private val jwtUtils: JWTUtils
){
    fun findById(id: String): PublicUserView {
        return userRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Usuário não encontrado")
            publicUserViewMapper.map(this)
        }
    }

    fun register(form: RegisterForm): User {
        return registerFormMapper.map(form).run {
            userRepository.save(this)
        }
    }

    fun authenticateAndGenerateToken(username: String, password: String): ResponseLoginView {
        val token = UsernamePasswordAuthenticationToken(username, password)
        val authResult: Authentication = authManager.authenticate(token)
        val user = authResult.principal as UserDetail
        return ResponseLoginView(jwtUtils.generateToken(user.username, user.authorities))
    }

    fun updateUserImage(image: MultipartFile): Image{
        return imageService.uploadImage(image)
    }


}