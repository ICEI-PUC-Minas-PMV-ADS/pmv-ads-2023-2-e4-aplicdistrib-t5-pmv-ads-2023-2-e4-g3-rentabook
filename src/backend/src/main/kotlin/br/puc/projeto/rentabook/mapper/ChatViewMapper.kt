package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.ChatView
import br.puc.projeto.rentabook.model.Chat
import org.springframework.stereotype.Component
import java.lang.Exception

@Component
class ChatViewMapper(
    private val publicUserViewMapper: PublicUserViewMapper,
) : Mapper<Chat, ChatView> {
    override fun map(t: Chat): ChatView {
        return ChatView(
            id = t.id ?: throw Exception("Id do chat invalido!"),
            owner = publicUserViewMapper.map(t.owner),
            lead = publicUserViewMapper.map(t.lead)
        )
    }
}