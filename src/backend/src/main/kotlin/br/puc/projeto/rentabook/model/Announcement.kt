package br.puc.projeto.rentabook.model

import br.puc.projeto.rentabook.dto.EspecificVolumeGoogleBooksDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document("announcements")
data class Announcement(
    @Id
    val id: String? = null,
    val bookId: String,
    val book: EspecificVolumeGoogleBooksDTO,
    @DBRef
    val ownerUser: User,
    @DBRef
    val images: MutableList<Image> = mutableListOf(),
    val description: String = "",
    val createdDate: LocalDateTime = LocalDateTime.now(),
    var isAvailable: Boolean = true,
    val rent: Boolean = false,
    val sale: Boolean = false,
    val trade: Boolean = false,
    val valueForSale: Double?,
    val valueForRent: Double?,
    @DBRef
    val location: Address,
    var status: String = "",
    var wasReturn: Boolean = false,
) {
    companion object {
        const val initial = ""
        const val waitingSend = "Aguardando envio"
        const val sended = "Enviado"
        const val awaitingDelivery = "Aguadando entrega"
        const val delivered = "Entregue"
        const val awaitingReturn = "Aguardando retorno"
        const val returned = "Devolvido"
        const val complete = "Finalizado"
    }
}
