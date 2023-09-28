package br.puc.projeto.rentabook.model

import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.model.User
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalDateTime

@Document("sale")
data class Sale(
        @Id
        val id: String? = null,
        val announcement: Announcement,
        val createData: LocalDateTime = LocalDateTime.now(),
        val value: Double,
        val buyerUser: User,
        var rating: Rating? = null,
        val chat: Chat?,
        var accepted: Boolean? = null,
        var cancelled: Boolean = false
)