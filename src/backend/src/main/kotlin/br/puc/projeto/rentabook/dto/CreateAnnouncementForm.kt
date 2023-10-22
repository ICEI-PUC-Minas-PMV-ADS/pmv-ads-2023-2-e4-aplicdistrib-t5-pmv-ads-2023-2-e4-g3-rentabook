package br.puc.projeto.rentabook.dto

data class CreateAnnouncementForm(
    val bookId: String,
    val images: List<String> = listOf(),
    val description: String = "",
    val valueForSale: Double?,
    val valueForRent: Double?,
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
