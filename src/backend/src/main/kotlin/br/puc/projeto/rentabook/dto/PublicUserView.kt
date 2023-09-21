package br.puc.projeto.rentabook.dto

data class PublicUserView (
    val id: String?,
    val name: String,
    val userImage: String?,
    val booksId: List<String?>?
)