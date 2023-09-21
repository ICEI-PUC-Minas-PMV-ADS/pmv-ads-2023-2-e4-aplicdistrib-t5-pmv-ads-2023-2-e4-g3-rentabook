package br.puc.projeto.rentabook.model

import org.apache.catalina.mbeans.UserMBean
import org.springframework.data.annotation.Id

data class Chat(
        @Id
        val id: String,
        val ownerUser: User,
        val lead: User,
        val messages: List<ChatMessage>
)