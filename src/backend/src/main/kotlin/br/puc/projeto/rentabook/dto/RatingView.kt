package br.puc.projeto.rentabook.dto

import java.time.LocalDate
import java.time.LocalTime

data class RatingView(
    val id: String,
    val ownerUser: PublicUserView,
    val message: String,
    val feedback: Boolean,
)
