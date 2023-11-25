package br.puc.projeto.rentabook.dto

import java.time.LocalDateTime

data class AnnouncementView(
    val id: String,
    val book: EspecificVolumeGoogleBooksDTO,
    val ownerUser: PublicUserView,
    val images: List<ImageView>,
    val description: String,
    val createdDate: LocalDateTime,
    val isAvailable: Boolean,
    val rent: Boolean,
    val sale: Boolean,
    val trade: Boolean,
    val valueForSale: Double?,
    val valueForRent: Double?,
    val location: PrivateAddressView,
    val status: String,
    val wasReturn: Boolean,
)
