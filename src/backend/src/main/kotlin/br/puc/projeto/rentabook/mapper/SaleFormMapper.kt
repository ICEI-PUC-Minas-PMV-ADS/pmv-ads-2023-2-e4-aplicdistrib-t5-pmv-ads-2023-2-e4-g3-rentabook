package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.model.Rent
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.ChatRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.service.AnnouncementService
import br.puc.projeto.rentabook.service.UserService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
class SaleFormMapper(
    private val announcementRepository: AnnouncementRepository,
    private val userRepository: UserRepository,
    private val chatRepository: ChatRepository,
): Mapper <SaleForm, Sale> {
    override fun map(t: SaleForm): Sale {
        val authentication = SecurityContextHolder.getContext().authentication
        val announcement = announcementRepository.findById(t.announcementId).orElseThrow { throw Exception("Anuncio não foi localizado!") }
        val lead = userRepository.findByEmail(authentication.name) ?: throw Exception("Usuário que ira alugar não localizado!")
        return Sale(
            announcement = announcement,
            ownerUser = announcement.ownerUser,
            startDate = LocalDate.now(),
            value = t.value,
            lead = lead,
            chat = chatRepository.save(Chat(owner = announcement.ownerUser, lead = lead)),
        )
    }

}