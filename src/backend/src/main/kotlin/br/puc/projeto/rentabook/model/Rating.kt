package br.puc.projeto.rentabook.model

import br.puc.projeto.rentabook.dto.PublicUserView
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.LocalTime

@Document("ratings")
data class Rating(
    val id: String? = null,
    val ownerUser: User,
    val message: String,
    val feedback: Boolean
)
