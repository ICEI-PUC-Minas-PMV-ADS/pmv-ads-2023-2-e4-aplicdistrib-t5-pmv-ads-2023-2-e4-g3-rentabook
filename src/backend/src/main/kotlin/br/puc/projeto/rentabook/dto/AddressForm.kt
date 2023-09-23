package br.puc.projeto.rentabook.dto

import jakarta.validation.constraints.NotNull

data class AddressForm (
    @field:NotNull val name: String,
    @field:NotNull val cep: String,
    @field:NotNull val street: String,
    @field:NotNull val number: String,
    val complement: String?,
    @field:NotNull val neighborhood: String,
    @field:NotNull val city: String,
    @field:NotNull val state: String
)