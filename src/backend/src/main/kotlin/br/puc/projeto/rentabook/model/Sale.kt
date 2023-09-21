package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import java.math.BigInteger
import java.time.LocalDateTime

data class Sale(
        @Id
        val id: String?,
        val announcement: Announcement,
        val createDate: LocalDateTime = LocalDateTime.now(),
        val value: BigInteger,
        val buyerUser: User,
        val rating: Rating? = null,
        val chat: Chat? = null,
        val accepted: Boolean? =null

)