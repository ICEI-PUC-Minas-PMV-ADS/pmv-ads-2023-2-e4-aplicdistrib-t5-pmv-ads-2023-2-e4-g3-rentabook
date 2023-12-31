package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RegisterForm
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.service.RoleService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component

@Component
class RegisterFormMapper(
    private val userRepository: UserRepository,
    private val roleService: RoleService,
): Mapper<RegisterForm, User>{
    override fun map(t: RegisterForm): User {
        return User(
            id = null,
            name = t.name,
            email = t.email,
            password = BCryptPasswordEncoder().encode(t.password),
            addresses = mutableListOf(),
            booksId = mutableListOf(),
            role = listOf(roleService.getCommonUserRole()),
            userImage = null
        )
    }
}