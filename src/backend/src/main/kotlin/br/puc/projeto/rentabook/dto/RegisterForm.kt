package br.puc.projeto.rentabook.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.springframework.web.multipart.MultipartFile

data class RegisterForm(
    @field:NotBlank(message = "O nome do usuário deve ser preenchido!")
    val name: String,
    @field:NotBlank(message = "O email do usuário deve ser preenchido!")
    val email: String,
    @field:NotBlank(message = "A senha do usuário deve ser preenchida!")
    @field:Size(min = 6, message = "A senha deve ter um tamanho minimo de 6 caracteres")
    val password: String
)