package br.puc.projeto.rentabook.dto

import br.puc.projeto.rentabook.model.Negotiations
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull

data class RatingForm(
    @field:NotNull
    val negotiation: Negotiations,
    @field:NotNull
    val idNegotiation: String,
    @field:Min(value = 1, message = "A quantidade de estrelas deve estar entre 1 e 5")
    @field:Max(value = 5, message = "A quantidade de estrelas deve estar entre 1 e 5")
    val stars: Int,
    val message: String?
)