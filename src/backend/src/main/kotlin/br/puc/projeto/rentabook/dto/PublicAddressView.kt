package br.puc.projeto.rentabook.dto

data class PublicAddressView (
    val id: String,
    val cep: String,
    val street: String,
    val neighborhood: String,
    val city: String,
    val state: String,
)