package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.security.core.GrantedAuthority

data class Role (
    @Id
    val id: String? = null,
    val name: String
) : GrantedAuthority {
    override fun getAuthority() = name
}