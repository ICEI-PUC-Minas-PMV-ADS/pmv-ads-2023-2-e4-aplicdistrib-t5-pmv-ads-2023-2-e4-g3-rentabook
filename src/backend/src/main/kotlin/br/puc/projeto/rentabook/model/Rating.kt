package br.puc.projeto.rentabook.model

import org.springframework.data.mongodb.core.mapping.Document

@Document("ratings")
data class Rating(
    val id: String? = null,
    val message: String,
    val feedback: Boolean,
)
