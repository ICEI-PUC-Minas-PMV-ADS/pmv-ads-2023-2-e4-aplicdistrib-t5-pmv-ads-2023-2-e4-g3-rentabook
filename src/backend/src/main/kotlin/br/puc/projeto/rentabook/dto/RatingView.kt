package br.puc.projeto.rentabook.dto

import java.time.LocalDate
import java.time.LocalTime

data class RatingView(
    val id: String,
    val announcementId: String,
    val ownerUser: PublicUserView,
    val renterUser: PublicUserView,
    val rating : Int,
    val comments: String,
    val date: LocalDate,
    val time: LocalTime
)
