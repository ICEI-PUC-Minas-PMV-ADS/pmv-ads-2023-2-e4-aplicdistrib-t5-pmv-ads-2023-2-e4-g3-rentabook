package br.puc.projeto.rentabook.dto

import java.awt.Image
import java.time.LocalDateTime

data class CreateAnnouncementForm(
    val bookId: String,
    val images: List<String> = listOf(),
    val description: String = "",
    val dailyValue: Long? = null,
    val saleValue: Long? = null,
    val locationId: String,
)
