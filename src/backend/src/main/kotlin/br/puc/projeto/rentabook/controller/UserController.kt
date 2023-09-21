package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.LoginForm
import br.puc.projeto.rentabook.dto.PublicUserView
import br.puc.projeto.rentabook.dto.RegisterForm
import br.puc.projeto.rentabook.dto.ResponseLoginView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.service.UserService
import jakarta.validation.Valid
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
class UserController (
    private val userService: UserService
){
    @GetMapping("/user/{id}")
    fun findById(@PathVariable id: String): PublicUserView {
        return userService.findById(id)
    }
    
    /**
     * Create user
     */

    @PostMapping("/register")
    fun register(@RequestBody @Valid form: RegisterForm): ResponseLoginView{
        return userService.register(form).run {
            userService.authenticateAndGenerateToken(form.email, form.password)
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody credentials: LoginForm): ResponseLoginView {
        return userService.authenticateAndGenerateToken(credentials.email, credentials.password)
    }


}