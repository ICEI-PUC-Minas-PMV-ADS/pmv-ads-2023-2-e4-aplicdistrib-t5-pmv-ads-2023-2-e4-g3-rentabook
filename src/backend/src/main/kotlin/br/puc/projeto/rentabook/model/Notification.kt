package br.puc.projeto.rentabook.model

import org.springframework.cglib.core.Local
import org.springframework.data.annotation.Id
import java.time.LocalDate

data class Notification (
    @Id
    val id: String? = null,
    val userId: String,
    val createData : LocalDate = LocalDate.now(),
    val message : String? = null

)
