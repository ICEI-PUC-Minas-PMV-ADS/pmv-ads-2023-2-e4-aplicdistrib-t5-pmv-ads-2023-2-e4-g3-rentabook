package br.puc.projeto.rentabook.model

import br.puc.projeto.rentabook.dto.PublicUserView
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalTime

@Document("ratings")
data class Rating(
    val id: String? = null,
    val announcementId: String,
    val rating: Int,
    val comments: String,
    val date: LocalDate,
    val time: LocalTime,
    val ownerUser: PublicUserView?,
    val renterUser: PublicUserView?,
    val message: String,
    val feedback: Boolean
)
