package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Notification
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository

interface NotificationRepository : MongoRepository<Notification, String> {
    fun findAllByUserId( userId: String ): List<Notification>
    fun deleteAllByUserId(userId: String)
}