package br.puc.projeto.rentabook.dto

import br.puc.projeto.rentabook.model.Rent
import java.time.LocalDateTime

data class ChatView(
    val id: String,
    val owner: PublicUserView,
    val lead: PublicUserView,
    val latestMessageDate: LocalDateTime,
    val sale: String?,
    val trade: String?,
    val rent: String?
)