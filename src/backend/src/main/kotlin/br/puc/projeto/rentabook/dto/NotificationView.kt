package br.puc.projeto.rentabook.dto

import java.time.LocalDate

data class NotificationView (
    val id: String? = null,
    val userId: String,
    val createData :LocalDate = LocalDate.now(),
    val message : String? = null

)
