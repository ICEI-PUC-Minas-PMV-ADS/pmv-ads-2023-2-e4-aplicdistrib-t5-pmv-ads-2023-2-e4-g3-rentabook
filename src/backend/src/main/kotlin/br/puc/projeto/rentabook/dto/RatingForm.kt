package br.puc.projeto.rentabook.dto

import java.time.LocalDate
import java.time.LocalTime

data class RatingForm(
    val announcementId: String,
    val message: String,
    val feedback: Boolean,
)