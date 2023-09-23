package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("addresses")
data class Address(
    @Id
    val id: String? = null,
    val name: String,
    val cep: String,
    val street: String,
    val number: String,
    val complement: String?,
    val neighborhood: String,
    val city: String,
    val state: String,
)
