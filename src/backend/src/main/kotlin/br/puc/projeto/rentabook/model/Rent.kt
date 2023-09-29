package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalDateTime

@Document("rents")
data class Rent(
    @Id
    val id: String? = null,
    val announcement: Announcement,
    val ownerUser: User,
    val createData: LocalDateTime = LocalDateTime.now(),
    val startDate: LocalDate,
    val endDate: LocalDate,
    val value: Double,
    val lead: User, // Usuario interessado em alugar o livro.
    var rating: Rating? = null,
    val chat: Chat,
    var accepted: Boolean = false,
    var cancelled: Boolean = false,
)