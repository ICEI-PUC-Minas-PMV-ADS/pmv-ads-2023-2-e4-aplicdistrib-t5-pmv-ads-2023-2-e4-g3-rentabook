package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import java.math.BigInteger
import java.time.LocalDateTime


data class Rent(
        @Id
        val id: String,
        val announcement: Announcement, //Announcement
        val ownerUser: User, //User
        val createDate: LocalDateTime = LocalDateTime.now(),
        val startDate: LocalDateTime,
        val endDate: LocalDateTime,
        val value: BigInteger,
        val renterUser: User,
        val rating: Rating? = null,
        val chat: Chat? = null,
        val accepted: Boolean? = null,
        val counterProposal: Rent? = null
)