package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.*
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface TradeRepository : MongoRepository<Trade, String> {
    fun findByChatId(id: String): Trade?
    fun findAllByLeadId(leadId: String): List<Trade>
}


