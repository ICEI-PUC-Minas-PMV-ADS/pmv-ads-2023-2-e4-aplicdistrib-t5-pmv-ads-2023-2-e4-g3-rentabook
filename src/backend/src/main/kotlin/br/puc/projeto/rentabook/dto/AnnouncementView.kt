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
    val rent: Boolean = false,
    val sale: Boolean = false,
    val trade: Boolean = false,
    val value: Long? = null,
    val location: PrivateAddressView,
)
