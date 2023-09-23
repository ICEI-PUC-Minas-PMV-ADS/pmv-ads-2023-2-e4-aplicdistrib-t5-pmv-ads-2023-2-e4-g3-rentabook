package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.ChatMessage
import org.springframework.data.mongodb.repository.MongoRepository

interface ChatMessageRepository : MongoRepository<ChatMessage, String> {}