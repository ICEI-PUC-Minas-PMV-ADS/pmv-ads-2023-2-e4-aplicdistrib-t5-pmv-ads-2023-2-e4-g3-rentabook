package br.puc.projeto.rentabook.dto

import jakarta.validation.constraints.NotNull

data class UpdatePasswordForm(
    @field:NotNull
    val email: String,
    @field:NotNull
    val oldPassword: String,
    @field:NotNull
    val newPassword: String
)