package br.puc.projeto.rentabook.utils

import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder

class AuthenticationUtils {
    companion object {
        /**
         * Facilita a checage de autenticação do usuario.
         */
        fun <R> authenticate(userRepository: UserRepository, block: (User) -> R): R {
            val authentication = SecurityContextHolder.getContext().authentication
            return userRepository.findByEmail(authentication.name).run {
                this ?: throw Exception("Usuário autenticado não encontrado")
                return@run block.invoke(this)
            }
        }
    }
}