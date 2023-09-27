package br.puc.projeto.rentabook.dto

import java.time.LocalDateTime

data class AnnouncementViewTest(
    val id: String,
    val book: EspecificVolumeGoogleBooksDTO,
    val ownerUser: PublicUserView,
    val images: List<ImageView>,
    val description: String,
    val createdDate: LocalDateTime,
    val isAvailable: Boolean,
    val rent: Boolean = false,
    val sale: Boolean = false,
    val dailyValue: Long? = null,
    val saleValue: Long? = null,
    val location: AddressView,
)
