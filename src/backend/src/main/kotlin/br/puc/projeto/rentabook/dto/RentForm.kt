package br.puc.projeto.rentabook.dto

data class RentForm(
    val announcementId: String,
    val startDate: String,
    val endDate: String,
    val value: Double,
)
