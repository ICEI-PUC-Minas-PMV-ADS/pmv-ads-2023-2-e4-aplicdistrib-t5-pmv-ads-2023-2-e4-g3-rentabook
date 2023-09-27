package br.puc.projeto.rentabook.dto

import java.time.LocalDate
import java.time.LocalDateTime

data class TradeView (
    val id: String,
    val announcement: AnnouncementViewTest,
    val ownerUser: PublicUserView,
    val createData: LocalDateTime = LocalDateTime.now(),
    val startDate: LocalDate,
    val tradeDate: LocalDate,
    val tradeUser: PublicUserView,
    val rating: RatingView?,
    val chat: ChatView,
    val accepted: Boolean,
)
