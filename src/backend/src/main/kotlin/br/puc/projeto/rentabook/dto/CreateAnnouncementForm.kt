package br.puc.projeto.rentabook.dto

import java.awt.Image
import java.time.LocalDateTime

data class CreateAnnouncementForm(
    val bookId: String,
    val images: List<String> = listOf(),
    val description: String = "",
    val value: Long,
    val locationId: String,
    var rent: Boolean?,
    val trade: Boolean?,
    val sale: Boolean?
) {
    companion object {
        const val RENT = "rent"
        const val SALE = "sale"
        const val TRADE = "trade"
    }
}
