package br.puc.projeto.rentabook.dto

import java.time.LocalDateTime


data class CleanAnnouncementView(
    val id: String?,
    val book: BookView,
    val ownerUser: PublicUserView,
    val images: List<String?>,
    val description: String,
    val createdDate: LocalDateTime,
    val isAvailable: Boolean,
    val rent: Boolean,
    val sale: Boolean,
    val trade: Boolean,
    val valueForSale: Double?,
    val valueForRent: Double?,
    val location: PublicAddressView,
    val averageStars: Int,
    val totalRatings: Int,
    val status: String,
    val wasReturn: Boolean,
)
