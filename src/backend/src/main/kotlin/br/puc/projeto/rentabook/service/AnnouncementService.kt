package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.mapper.AnnouncementViewMapper
import br.puc.projeto.rentabook.mapper.CreateAnnouncementFormMapper
import br.puc.projeto.rentabook.mapper.CreateRentFormMapper
import br.puc.projeto.rentabook.mapper.RentViewMapper
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RatingRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
class AnnouncementService(
    private val announcementRepository: AnnouncementRepository,
    private val userRepository: UserRepository,
    private val createAnnouncementFormMapper: CreateAnnouncementFormMapper,
    private val announcementViewMapper: AnnouncementViewMapper,
    private val rentRepository: RentRepository,
    private val createRentFormMapper: CreateRentFormMapper,
    private val rentViewMapper: RentViewMapper,
    private val ratingRepository: RatingRepository,
) {

    fun findAll(pageable: Pageable): Page<AnnouncementView> {
        return announcementRepository.findAll(pageable).map { announcementViewMapper.map(it) }
    }

    fun createAnnouncement(createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return AuthenticationUtils.authenticate(userRepository) {
            announcementRepository.save(createAnnouncementFormMapper.map(createAnnouncementForm)).run {
                announcementViewMapper.map(this)
            }
        }
    }

    fun findAllBooksAvailableToRent(pageable: Pageable): Page<AnnouncementView> {
        return AuthenticationUtils.authenticate(userRepository) {
            announcementRepository.findAllByRentTrue(pageable)
                .filter { it.isAvailable }
                .run { getCustomPage(map { announcementViewMapper.map(it) }, pageable = pageable) }
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

    fun findAllUsersBooksAvailableToNegotiate(pageable: Pageable): Page<AnnouncementView> {
        return AuthenticationUtils.authenticate(userRepository) {
            announcementRepository.findAllByIsAvailableTrue(pageable)
                .map { announcementViewMapper.map(it) }
        }
    }

    fun giveBackRent(giveBackForm: GiveBackForm) {
        return AuthenticationUtils.authenticate(userRepository) {
            val rent = rentRepository.findById(giveBackForm.id).orElseThrow { throw Exception("Id de aluguel invalido!") }
            rent.rating = ratingRepository.save(Rating(
                message = giveBackForm.ratingMessage,
                feedback = giveBackForm.ratingFeedback,
            ))
            rent.announcement.isAvailable = true
            announcementRepository.save(rent.announcement)
            rentRepository.save(rent)
        }
    }

    fun <R> getCustomPage(list: List<R>, pageable: Pageable): Page<R> {
        val startIndex = pageable.pageNumber * pageable.pageSize
        val endIndex = (startIndex + pageable.pageSize).coerceAtMost(list.size)

        val pageList = list.subList(startIndex, endIndex)

        return PageImpl(pageList, pageable, list.size.toLong())
    }
}