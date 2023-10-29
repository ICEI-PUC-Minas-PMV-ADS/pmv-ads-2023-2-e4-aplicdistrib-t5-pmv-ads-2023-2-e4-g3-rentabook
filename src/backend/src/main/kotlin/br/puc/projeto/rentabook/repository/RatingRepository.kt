package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Rating
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository

interface RatingRepository : MongoRepository<Rating, String> {
    fun findByOwnerIdAndIdNegotiation(ownerUserId: String, idNegotiation: String): Rating?

    fun findByAnnouncementId(id: String): List<Rating>

    fun findByIdNegotiation(id: String): Rating?

    fun findByAnnouncementId(id: String, pageable: Pageable): Page<Rating>
}