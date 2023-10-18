package br.puc.projeto.rentabook.dto

data class PrivateAddressView(
    val id: String,
    val name: String,
    val cep: String,
    val street: String,
    val number: String,
    val complement: String?,
    val neighborhood: String,
    val city: String,
    val state: String,
)
