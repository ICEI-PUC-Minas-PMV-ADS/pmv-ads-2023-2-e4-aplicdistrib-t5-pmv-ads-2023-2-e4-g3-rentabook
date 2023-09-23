package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Chat
import org.springframework.data.mongodb.repository.MongoRepository

interface ChatRepository : MongoRepository<Chat, String> {}