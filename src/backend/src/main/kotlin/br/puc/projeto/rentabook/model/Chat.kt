package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("chats")
data class Chat(
    @Id
    val id: String? = null,
    @DBRef
    val owner: User,
    @DBRef
    val lead: User,
    @DBRef
    val messages: List<ChatMessage> = listOf(),
    var latestMessageDate: LocalDateTime = LocalDateTime.now()
)
