package br.puc.projeto.rentabook.dto

import org.springframework.web.multipart.MultipartFile

data class RegisterForm(
    val name: String,
    val email: String,
    val password: String
)