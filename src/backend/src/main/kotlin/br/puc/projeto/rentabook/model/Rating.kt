package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("ratings")
data class Rating(
    @Id
    val id: String? = null,
    val owner: User,
    val announcement: Announcement,
    val negotiation: Negotiations,
    val idNegotiation: String,
    val stars: Int,
    val message: String?
)
