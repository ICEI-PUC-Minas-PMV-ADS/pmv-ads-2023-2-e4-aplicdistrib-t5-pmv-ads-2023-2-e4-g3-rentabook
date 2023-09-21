package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.model.User
import org.springframework.security.core.userdetails.UserDetails

class UserDetail(
    private val user: User
) : UserDetails {
    override fun getAuthorities() = user.role

    override fun getPassword(): String = user.password

    override fun getUsername(): String = user.email

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isEnabled(): Boolean = true
}