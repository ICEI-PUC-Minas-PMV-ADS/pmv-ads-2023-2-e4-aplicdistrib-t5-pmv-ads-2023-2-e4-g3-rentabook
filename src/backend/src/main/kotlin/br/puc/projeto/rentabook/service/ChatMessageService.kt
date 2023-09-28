package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.ChatMessageView
import br.puc.projeto.rentabook.dto.CreateChatMessageForm
import br.puc.projeto.rentabook.mapper.ChatMessageViewMapper
import br.puc.projeto.rentabook.mapper.CreateChatMessageFormMapper
import br.puc.projeto.rentabook.model.ChatMessage
import br.puc.projeto.rentabook.repository.ChatMessageRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
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
        return AuthenticationUtils.authenticate(userRepository) {
            chatMessageRepository.save(createChatMessageFormMapper.map(createChatMessageForm)).run {
                chatMessageViewMapper.map(this)
            }
        }
    }

    fun getRecentMessages(idChat: String, pageable: Pageable): Page<ChatMessageView> {
        return AuthenticationUtils.authenticate(userRepository) {
            chatMessageRepository.findAllByChatId(idChat, pageable).map {
                chatMessageViewMapper.map(it)
            }.run {
                getCustomPage(this, pageable)
            }
        }
    }

    fun <R> getCustomPage(bookList: List<R>, pageable: Pageable): Page<R> {
        val startIndex = pageable.pageNumber * pageable.pageSize
        val endIndex = (startIndex + pageable.pageSize).coerceAtMost(bookList.size)

        val pageList = bookList.subList(startIndex, endIndex)

        return PageImpl(pageList, pageable, bookList.size.toLong())
    }
}