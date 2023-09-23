package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Announcement
import org.springframework.data.mongodb.repository.MongoRepository

interface AnnouncementRepository : MongoRepository<Announcement, String> {
    fun findAllByOwnerUserId(id: String): List<Announcement>
}