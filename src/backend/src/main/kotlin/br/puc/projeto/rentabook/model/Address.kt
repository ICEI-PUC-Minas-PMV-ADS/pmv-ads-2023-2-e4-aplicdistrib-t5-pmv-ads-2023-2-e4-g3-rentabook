package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id

data class Address(
    @Id
    val id: String,
    val cep: String,
    val street: String,
    val number: String,
    val complement: String,
    val neighborhood: String,
    val city: String,
    val state: String,
)
