package br.puc.projeto.rentabook.model

import br.puc.projeto.rentabook.dto.EspecificVolumeGoogleBooksDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("announcements")
data class Announcement(
    @Id
    val id: String? = null,
    val bookId: String,
    val ownerUser: User,
    val images: List<Image> = listOf(),
    val description: String = "",
    val createdDate: LocalDateTime = LocalDateTime.now(),
    var isAvailable: Boolean = true,
    val rent: Boolean = false,
    val sale: Boolean = false,
    val dailyValue: Long? = null,
    val saleValue: Long? = null,
    val location: Address,
)