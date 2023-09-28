package br.puc.projeto.rentabook.dto

data class RecoveryPasswordForm (
    val email: String,
    val verificationCode: String,
    val newPassword: String
)
