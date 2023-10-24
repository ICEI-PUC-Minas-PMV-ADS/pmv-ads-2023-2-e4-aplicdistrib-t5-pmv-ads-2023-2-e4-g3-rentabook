package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("chat_messages")
data class ChatMessage(
    @Id
    val id: String? = null,
    @DBRef
    val sender: User,
    @DBRef
    val chat: Chat,
    val message: String,
    val readed: Boolean = false,
    val createdDate: LocalDateTime = LocalDateTime.now(),
)