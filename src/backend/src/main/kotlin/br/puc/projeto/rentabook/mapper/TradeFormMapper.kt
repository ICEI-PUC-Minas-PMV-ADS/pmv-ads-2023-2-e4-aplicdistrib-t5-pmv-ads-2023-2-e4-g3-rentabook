package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.TradeForm
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.model.Trade
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.ChatRepository
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
class TradeFormMapper(
    private val announcementRepository: AnnouncementRepository,
    private val userRepository: UserRepository,
    private val chatRepository: ChatRepository,
): Mapper<TradeForm, Trade> {
    override fun map(t: TradeForm): Trade {
        val authentication = SecurityContextHolder.getContext().authentication
        val announcement = announcementRepository.findById(t.announcementId).orElseThrow { throw Exception("Anuncio não foi localizado!") }
        val lead = userRepository.findByEmail(authentication.name) ?: throw Exception("Usuário que ira alugar não localizado!")
        return Trade(
            announcement = announcement,
            ownerUser = announcement.ownerUser,
            startDate = LocalDate.now(),
            value = t.value,
            lead = lead,
            chat = chatRepository.save(Chat(owner = announcement.ownerUser, lead = lead)),
        )
    }
}