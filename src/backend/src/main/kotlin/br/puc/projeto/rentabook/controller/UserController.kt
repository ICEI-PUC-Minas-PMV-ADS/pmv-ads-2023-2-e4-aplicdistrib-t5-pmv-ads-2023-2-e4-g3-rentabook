package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.forms.UserForm
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.service.UserService
import com.google.gson.Gson
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(
    private val userService: UserService,
    private val userRepository: UserRepository,
) {
    @GetMapping("/{id}")
    //teste
    fun findById(@PathVariable id: String): User {
        return userRepository.findByIdOrNull(id).run {
            this ?: throw Exception("Usuário não encontrado")
        }
    }
    
    /**
     * Create user
     */

    @PostMapping("/register",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE],
    )
    fun createUser(
        @Valid
        @RequestBody
        userForm: UserForm
    ): ResponseEntity<Any> {
        lateinit var user: User
        try {
            user = userService.registerUser(userForm)
        } catch (e: Exception) {
            val message = e.message ?: ""
            return ResponseEntity.ok(mapOf(
                "status" to "error",
                "data" to mapOf<String, Any>(
                    "message" to message,
                )
            ))
        }
        return ResponseEntity.ok(
            Gson().toJson(mapOf(
                "status" to "ok",
                "data" to user,
            ))
        )
    }
}