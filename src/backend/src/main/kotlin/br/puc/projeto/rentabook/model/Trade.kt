package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalDateTime

@Document("trades")
data class Trade (
    @Id
    val id: String? = null,
    val announcement: Announcement,
    val ownerUser: User,
    val createData: LocalDateTime = LocalDateTime.now(),
    val startDate: LocalDate? = null,
    val endDate: LocalDate? = null,
    val value: Double,
    val lead: User, // Usuario interessado em trocar o livro.
    var rating: Rating? = null,
    val chat: Chat,
    var accepted: Boolean = false,
    var cancelled: Boolean = false,
)
