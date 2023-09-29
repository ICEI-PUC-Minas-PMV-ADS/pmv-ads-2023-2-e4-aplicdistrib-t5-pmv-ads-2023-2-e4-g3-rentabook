package br.puc.projeto.rentabook.dto

import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.model.User
import org.springframework.data.annotation.Id
import java.time.LocalDateTime

data class SaleView (
    val id: String?,
    val announcement: String?,
    val createData: LocalDateTime,
    val value: Double,
    val buyerUser: String?,
    var rating: String?,
    val chat: String?,
    var accepted: Boolean = false,
    var cancelled: Boolean = false,
)