package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.*
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RatingRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.Exception

@Service
class AnnouncementService(
        private val announcementRepository: AnnouncementRepository,
        private val userRepository: UserRepository,
        private val createAnnouncementFormMapper: CreateAnnouncementFormMapper,
        private val announcementViewTestMapper: AnnouncementViewTestMapper,
        private val rentRepository: RentRepository,
        private val createRentFormMapper: CreateRentFormMapper,
        private val rentViewMapper: RentViewMapper,
        private val ratingRepository: RatingRepository,
        private val announcementViewMapper: AnnouncementViewMapper

        ) {

    fun findAll(pageable: Pageable): Page<AnnouncementViewTest> {
        return announcementRepository.findAll(pageable).map { announcementViewTestMapper.map(it) }
    }

    fun createAnnouncement(createAnnouncementForm: CreateAnnouncementForm): AnnouncementViewTest {
        return AuthenticationUtils.authenticate(userRepository) {
            announcementRepository.save(createAnnouncementFormMapper.map(createAnnouncementForm)).run {
                announcementViewTestMapper.map(this)
            }
        }
    }

    fun createRent(createRentForm: CreateRentForm): RentView {
        return AuthenticationUtils.authenticate(userRepository) {
            rentRepository.save(createRentFormMapper.map(createRentForm)).run {
                announcement.isAvailable = false
                announcementRepository.save(announcement)
                rentViewMapper.map(this)
            }
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

    @Transactional
    fun cancelAnnouncement(announcementId: String) {
        return AuthenticationUtils.authenticate(userRepository) {
            val announcement = announcementRepository.findById(announcementId)
                    .orElseThrow { NotFoundException("Anúncio não encontrado") }

            // Verifica se o anúncio está disponível antes de cancelá-lo
            if (announcement.isAvailable) {

                // Define o anúncio como não disponível
                announcement.isAvailable = false

                // Salva as alterações no anúncio
                announcementRepository.save(announcement)
            } else {
                // Se o anúncio já estiver cancelado, você pode lançar uma exceção personalizada ou tratar de acordo com sua lógica de negócios.

                // Neste exemplo, lançaremos uma exceção.

                throw IllegalStateException("O anúncio já foi cancelado anteriormente.")
            }
        }
    }

    fun list(pageable: Pageable, city: String?, bookId: String?): Page<AnnouncementView> {

        return with(if (city != null && bookId != null) {
            announcementRepository.findByLocationCityContainingAndBookId(city, bookId, pageable)
        } else if (city != null) {
            announcementRepository.findByLocationCity(city, pageable)
        } else if (bookId != null) {
            announcementRepository.findByBookId(bookId, pageable)
        } else {
            announcementRepository.findAll(pageable)
        }) {
            map { t ->
                announcementViewMapper.map(t)
            }
        }


    }

}