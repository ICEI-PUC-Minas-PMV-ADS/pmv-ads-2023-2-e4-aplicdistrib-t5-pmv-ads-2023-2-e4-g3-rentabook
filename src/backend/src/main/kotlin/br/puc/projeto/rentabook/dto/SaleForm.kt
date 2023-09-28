package br.puc.projeto.rentabook.dto

import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.User

data class SaleForm(
        val announcement: String,
        val value: Double,
        val buyerUser: String,
)
