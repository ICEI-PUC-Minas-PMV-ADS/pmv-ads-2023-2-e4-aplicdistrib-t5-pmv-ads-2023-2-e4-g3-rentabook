package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class UserDetailsService(private val repository: UserRepository): UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails {
        return repository.findByEmail(username).run {
            this ?: throw RuntimeException()
            UserDetail(this)
        }
    }
}