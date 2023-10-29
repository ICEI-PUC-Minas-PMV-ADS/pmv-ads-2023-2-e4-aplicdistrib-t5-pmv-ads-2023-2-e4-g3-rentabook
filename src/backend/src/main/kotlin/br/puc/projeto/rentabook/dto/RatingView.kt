package br.puc.projeto.rentabook.dto

import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Negotiations
import br.puc.projeto.rentabook.model.User
import org.springframework.data.annotation.Id
import java.time.LocalDate
import java.time.LocalTime

data class RatingView(
    val id: String? = null,
    val owner: PublicUserView,
    val announcement: CleanAnnouncementView,
    val negotiation: Negotiations,
    val idNegotiation: String,
    val stars: Int,
    val message: String?
)
