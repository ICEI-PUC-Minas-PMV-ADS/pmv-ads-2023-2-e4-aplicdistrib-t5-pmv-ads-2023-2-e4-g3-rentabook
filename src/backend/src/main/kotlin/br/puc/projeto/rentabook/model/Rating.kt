package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import java.time.LocalDateTime


data class Rating(
        @Id
        val id: String,
        val announcement: Announcement,
        val ownerUser: User,
        val createdDate: LocalDateTime = LocalDateTime.now(),
        val stars: Int,
        val message: String,
        val replica: String? = null

)