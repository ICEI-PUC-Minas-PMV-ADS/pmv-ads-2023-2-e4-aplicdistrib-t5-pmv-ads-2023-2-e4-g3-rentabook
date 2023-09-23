package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.CreateRentForm
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.model.Rent
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.ChatRepository
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
class CreateRentFormMapper(
    private val announcementRepository: AnnouncementRepository,
    private val userRepository: UserRepository,
    private val chatRepository: ChatRepository,
): Mapper<CreateRentForm, Rent> {
    override fun map(t: CreateRentForm): Rent {
        val authentication = SecurityContextHolder.getContext().authentication
        val announcement = announcementRepository.findById(t.announcementId).orElseThrow { throw Exception("Anuncio não foi localizado!") }
        val lead = userRepository.findByEmail(authentication.name) ?: throw Exception("Usuário que ira alugar não localizado!")
        return Rent(
            announcement = announcement,
            ownerUser = announcement.ownerUser,
            startDate = LocalDate.parse(t.startDate),
            endDate = LocalDate.parse(t.endDate),
            value = t.value,
            renterUser = lead,
            chat = chatRepository.save(Chat(owner = announcement.ownerUser, lead = lead)),
        )
    }
}