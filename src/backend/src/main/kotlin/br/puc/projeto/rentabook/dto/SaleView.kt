package br.puc.projeto.rentabook.dto

import java.time.LocalDate
import java.time.LocalDateTime

data class SaleView(
    val id: String,
    val announcement: AnnouncementViewTest,
    val ownerUser: PublicUserView,
    val createData: LocalDateTime = LocalDateTime.now(),
    val startDate: LocalDate,
    val endDate: LocalDate,
    val value: Double,
    val renterUser: PublicUserView,
    val rating: RatingView?,
    val chat: ChatView,
    val accepted: Boolean,
)
