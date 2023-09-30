package br.puc.projeto.rentabook.dto

import java.time.LocalDate
import java.time.LocalDateTime

data class TradeView(
    val id: String,
    val announcement: AnnouncementView,
    val ownerUser: PublicUserView,
    val createData: LocalDateTime = LocalDateTime.now(),
    val startDate: LocalDate,
    val endDate: LocalDate?,
    val value: Double,
    val lead: PublicUserView,
    val rating: RatingView?,
    val chat: ChatView,
    val accepted: Boolean,
    val cancelled: Boolean,
)
