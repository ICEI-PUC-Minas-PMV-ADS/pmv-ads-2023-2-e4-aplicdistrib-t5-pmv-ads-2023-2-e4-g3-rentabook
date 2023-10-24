package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalDateTime

@Document("rents")
data class Rent(
    @Id
    val id: String? = null,
    @DBRef
    val announcement: Announcement,
    @DBRef
    val ownerUser: User,
    val createData: LocalDateTime = LocalDateTime.now(),
    val startDate: LocalDate? = null,
    val endDate: LocalDate? = null,
    val value: Double,
    @DBRef
    val lead: User, // Usuario interessado em alugar o livro.
    @DBRef
    var rating: Rating? = null,
    @DBRef
    val chat: Chat,
    var accepted: Boolean = false,
    var cancelled: Boolean = false,
)