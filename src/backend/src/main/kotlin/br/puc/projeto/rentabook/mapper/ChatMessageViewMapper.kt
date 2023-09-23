package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.ChatMessageView
import br.puc.projeto.rentabook.model.ChatMessage
import org.springframework.stereotype.Component

@Component
class ChatMessageViewMapper(
    private val publicUserViewMapper: PublicUserViewMapper,
    private val chatViewMapper: ChatViewMapper,
) : Mapper<ChatMessage, ChatMessageView> {
    override fun map(t: ChatMessage): ChatMessageView {
        return ChatMessageView(
            id = t.id ?: throw Exception("Id invalido!"),
            message = t.message,
            sender = publicUserViewMapper.map(t.sender),
            chat = chatViewMapper.map(t.chat),
        )
    }
}