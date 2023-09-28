package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.service.NotificationService
import br.puc.projeto.rentabook.service.UserService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
class UserController(
    private val userService: UserService,
    private val notificationService: NotificationService
) {
    @GetMapping("/user/{id}")
    fun getPublicUser(@PathVariable id: String): PublicUserView {
        return userService.getPublicUser(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/user")
    fun getPrivateUser(): PrivateUserView {
        return userService.getPrivateUser()
    }

    @PostMapping("/register")
    fun register(@RequestBody @Valid form: RegisterForm): ResponseLoginView {
        return userService.checkDuplicatedEmail(form.email) {
            userService.register(form).run {
                userService.authenticateAndGenerateToken(form.email, form.password)
            }
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody @Valid credentials: LoginForm): ResponseLoginView {
        return userService.authenticateAndGenerateToken(credentials.email, credentials.password)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/user/image")
    fun uploadImage(@RequestBody image: MultipartFile): PrivateUserView {
        return userService.updateUserImage(image)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @DeleteMapping("/user/image")
    fun deleteImage(): PrivateUserView {
        return userService.deleteUserImage()
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/user/address")
    fun registerAddress(@RequestBody @Valid form: AddressForm): AddressView {
        return userService.registerAddress(form)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @DeleteMapping("/user/address/{id}")
    fun deleteAddress(@PathVariable id: String): PrivateUserView {
        return userService.deleteAddress(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/user/updateProfile")
    fun updateProfile(@RequestBody updateProfileForm: UpdateProfileForm): PrivateUserView {
        return userService.updateUserProfile(updateProfileForm)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PutMapping("/user/updatePassword")
    fun updatePassword(@RequestBody @Valid form: UpdatePasswordForm): ResponseLoginView {
        return userService.updatePassword(form).run {
            userService.authenticateAndGenerateToken(form.email, form.newPassword)
        }
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/user/books/{id}")
    fun registerBook(@PathVariable id: String): PrivateUserView {
        return userService.registerBook(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @DeleteMapping("/user/books/{id}")
    fun deleteBook(@PathVariable id: String): PrivateUserView {
        return userService.deleteBook(id)
    }
    @GetMapping("/user/notifications")
    fun sendNotificationstoUser() : List<NotificationView> {
        return notificationService.getAllNotification()
    }

    @PostMapping("/recovery/{email}")
    fun sendRecoveryPassword(@PathVariable email: String){
        userService.sendRecoveryPassword(email)
    }

    @PutMapping("/recovery")
    fun recoveryPassword(@RequestBody form: RecoveryPasswordForm){
        userService.recoveryPassword(form)
    }


}