package br.puc.projeto.rentabook.controllers

import br.puc.projeto.rentabook.forms.UserForm
import br.puc.projeto.rentabook.mappers.UserMapper
import br.puc.projeto.rentabook.models.User
import br.puc.projeto.rentabook.services.UserService
import com.fasterxml.jackson.databind.util.JSONPObject
import com.google.gson.Gson
import jakarta.validation.Valid
import org.bson.json.JsonObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class UserController {

    @Autowired
    private lateinit var userService: UserService

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