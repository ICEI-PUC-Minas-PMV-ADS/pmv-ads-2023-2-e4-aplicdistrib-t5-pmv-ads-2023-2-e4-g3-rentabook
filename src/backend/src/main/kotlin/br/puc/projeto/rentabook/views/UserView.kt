package br.puc.projeto.rentabook.views

import br.puc.projeto.rentabook.models.Image
import java.time.LocalDateTime
import java.util.*

data class UserView(
    val id: String,
    val name: String,
    val userImage: Image? = null,
    val email: String,
    val createData: Date? = null,
    val addresses: List<String>? = null,
)