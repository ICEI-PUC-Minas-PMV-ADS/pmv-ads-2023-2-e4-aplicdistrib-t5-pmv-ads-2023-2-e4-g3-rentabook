package br.puc.projeto.rentabook.dto

data class GiveBackForm(
    val id: String,
    val ratingMessage: String,
    val ratingFeedback: Boolean,
)
