package br.puc.projeto.rentabook.dto

import jakarta.validation.constraints.NotNull

data class LoginForm (
    @field:NotNull
    val email: String,
    @field:NotNull
    val password: String
)