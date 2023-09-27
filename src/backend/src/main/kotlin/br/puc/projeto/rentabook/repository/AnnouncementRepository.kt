package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Announcement
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface AnnouncementRepository : MongoRepository<Announcement, String> {
    fun findAllByIsAvailableTrue(pageable: Pageable): Page<Announcement>
    fun findAllByRentTrue(pageable: Pageable): List<Announcement>

}