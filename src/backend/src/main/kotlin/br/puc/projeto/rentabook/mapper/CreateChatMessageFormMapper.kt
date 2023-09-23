package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.CreateChatMessageForm
import br.puc.projeto.rentabook.model.ChatMessage
import br.puc.projeto.rentabook.repository.ChatRepository
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.lang.Exception

@Component
class CreateChatMessageFormMapper(
    private val userRepository: UserRepository,
    private val chatRepository: ChatRepository,
) : Mapper<CreateChatMessageForm, ChatMessage> {
    override fun map(t: CreateChatMessageForm): ChatMessage {
        val authentication = SecurityContextHolder.getContext().authentication
        return ChatMessage(
            sender = userRepository.findByEmail(authentication.name).run {
                this ?: throw Exception("Usuário autenticado não encontrado")
                this
            },
            chat = chatRepository.findById(t.chatId).orElseThrow { throw Exception("Id do chat invalido!") },
            message = t.message,
        )
    }
}