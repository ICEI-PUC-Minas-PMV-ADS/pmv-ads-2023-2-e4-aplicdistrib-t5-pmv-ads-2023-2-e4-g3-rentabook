package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.service.UserService
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
class UserController (
    private val userService: UserService
){
    @GetMapping("/user/{id}")
    fun getPublicUser(@PathVariable id: String): PublicUserView {
        return userService.getPublicUser(id)
    }

    @GetMapping("/user")
    fun getPrivateUser(): PrivateUserView {
        return userService.getPrivateUser()
    }

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

    @PostMapping("/user/image")
    fun uploadImage(@RequestBody image: MultipartFile): PrivateUserView {
        return userService.updateUserImage(image)
    }

    @DeleteMapping("/user/image")
    fun deleteImage(): PrivateUserView{
        return userService.deleteUserImage()
    }


}