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
    val value: Long,
    val location: PublicAddressView,
)
