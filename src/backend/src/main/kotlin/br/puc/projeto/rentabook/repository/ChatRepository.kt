package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.dto.ChatView
import br.puc.projeto.rentabook.model.Chat
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository

interface ChatRepository : MongoRepository<Chat, String> {
    fun findByOwnerIdOrLeadId(ownerId: String, leadId: String, pageable: Pageable): Page<Chat>
}