package br.puc.projeto.rentabook.dto

data class ChatMessageView(
    val id: String,
    val message: String,
    val sender: PublicUserView,
    val chat: ChatView,
)