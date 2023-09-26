package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Announcement
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository

interface AnnouncementRepository : MongoRepository<Announcement, String> {
    fun findAllByOwnerUserId(id: String): List<Announcement>
    fun findByLocationCity(city: String, pageable: Pageable): Page<Announcement>
    fun findByBookId(bookId: String, pageable: Pageable): Page<Announcement>
    fun findByLocationCityContainingAndBookId(locationCity: String, bookId: String, pageable: Pageable): Page<Announcement>


}