package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(
    private val userRepository: UserRepository
) {
    @GetMapping("/{id}")
    //teste
    fun findById(@PathVariable id: String): User {
        return userRepository.findByIdOrNull(id).run {
            this ?: throw Exception("Usuário não encontrado")
        }
    }

    @PostMapping("/register")
    //teste
    fun register(@RequestBody user: User):User{
        return userRepository.save(user)
    }
}