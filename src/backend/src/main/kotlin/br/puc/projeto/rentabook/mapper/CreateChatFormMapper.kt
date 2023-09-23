package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.CreateChatForm
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.stereotype.Component

@Component
class CreateChatFormMapper(
    private val userRepository: UserRepository,
): Mapper<CreateChatForm, Chat> {
    override fun map(t: CreateChatForm): Chat {
        return Chat(
            owner = userRepository.findById(t.ownerId)
                .orElseThrow { throw Exception("Owner não encontrado!") },
            lead = userRepository.findById(t.leadId)
                .orElseThrow { throw Exception("Lead não encontrado!") },
        )
    }
}