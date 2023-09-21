package br.puc.projeto.rentabook.forms

import br.puc.projeto.rentabook.model.User
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import lombok.Data
import java.util.Calendar

@Data
data class UserForm(
    @field:NotBlank(message = "O nome do usuário deve ser preenchido!")
    val name: String,
    val userImage: String? = null,

    @field:NotBlank(message = "O email do usuário deve ser preenchido!")
    val email: String,

    @field:NotBlank(message = "A senha do usuário deve ser preenchida!")
    @field:Size(min = 6, message = "A senha deve ter um tamanho minimo de 6 caracteres")
    val password: String,
) {
//    fun toUser(): User {
//        return User(
//            name = name,
//            email = email,
//            password = password,
//            createData = Calendar.getInstance().time,
//        )
//    }
}