package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.AnnouncementView
import br.puc.projeto.rentabook.dto.CreateAnnouncementForm
import br.puc.projeto.rentabook.dto.CreateRentForm
import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.mapper.AnnouncementViewMapper
import br.puc.projeto.rentabook.mapper.CreateAnnouncementFormMapper
import br.puc.projeto.rentabook.mapper.CreateRentFormMapper
import br.puc.projeto.rentabook.mapper.RentViewMapper
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class AnnouncementService(
    private val announcementRepository: AnnouncementRepository,
    private val userRepository: UserRepository,
    private val createAnnouncementFormMapper: CreateAnnouncementFormMapper,
    private val announcementViewMapper: AnnouncementViewMapper,
    private val rentRepository: RentRepository,
    private val createRentFormMapper: CreateRentFormMapper,
    private val rentViewMapper: RentViewMapper,
) {
    fun createAnnouncement(createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return AuthenticationUtils.authenticate(userRepository) {
            announcementRepository.save(createAnnouncementFormMapper.map(createAnnouncementForm)).run {
                announcementViewMapper.map(this)
            }
        }
    }

    fun createRent(createRentForm: CreateRentForm): RentView {
        return AuthenticationUtils.authenticate(userRepository)  {
            rentRepository.save(createRentFormMapper.map(createRentForm)).run {
                announcement.isAvailable = false
                announcementRepository.save(announcement)
                rentViewMapper.map(this)
            }
        }
    }
}