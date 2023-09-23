package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.ChatMessageView
import br.puc.projeto.rentabook.dto.CreateChatMessageForm
import br.puc.projeto.rentabook.mapper.ChatMessageViewMapper
import br.puc.projeto.rentabook.mapper.CreateChatMessageFormMapper
import br.puc.projeto.rentabook.repository.ChatMessageRepository
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class ChatMessageService(
    private val userRepository: UserRepository,
    private val chatMessageRepository: ChatMessageRepository,
    private val createChatMessageFormMapper: CreateChatMessageFormMapper,
    private val chatMessageViewMapper: ChatMessageViewMapper,
) {
    fun createChatMessage(createChatMessageForm: CreateChatMessageForm): ChatMessageView {
        val authentication = SecurityContextHolder.getContext().authentication
        return userRepository.findByEmail(authentication.name).run {
            this ?: throw Exception("Usuário autenticado não encontrado")
            chatMessageRepository.save(createChatMessageFormMapper.map(createChatMessageForm)).run {
                chatMessageViewMapper.map(this)
            }
        }
    }
}