package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Rent
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.model.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface SaleRepository : MongoRepository<Sale, String> {
    fun findByChatId(id: String): Sale?
}


