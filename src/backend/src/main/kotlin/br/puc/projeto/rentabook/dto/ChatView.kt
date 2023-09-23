package br.puc.projeto.rentabook.dto

data class ChatView(
    val id: String,
    val owner: PublicUserView,
    val lead: PublicUserView,
)