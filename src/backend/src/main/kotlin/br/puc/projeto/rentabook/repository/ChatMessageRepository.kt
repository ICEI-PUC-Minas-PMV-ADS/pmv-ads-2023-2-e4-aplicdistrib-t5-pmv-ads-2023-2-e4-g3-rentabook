package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.ChatMessage
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface ChatMessageRepository : MongoRepository<ChatMessage, String> {
    @Query(sort = "{\"createdDate\": -1}")
    fun findAllByChatId(id: String, pageable: Pageable): List<ChatMessage>
}