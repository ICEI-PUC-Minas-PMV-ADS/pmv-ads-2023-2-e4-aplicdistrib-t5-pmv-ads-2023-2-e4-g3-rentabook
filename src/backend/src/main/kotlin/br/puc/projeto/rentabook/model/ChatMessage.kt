package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id

data class ChatMessage(
        @Id
        val id: String?,
        val message: String,
        val isRead: Boolean
)