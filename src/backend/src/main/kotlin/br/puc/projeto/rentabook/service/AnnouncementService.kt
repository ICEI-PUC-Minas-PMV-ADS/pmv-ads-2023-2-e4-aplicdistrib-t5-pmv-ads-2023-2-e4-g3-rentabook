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
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.model.Image
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import kotlin.Exception

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
    private val imageService: ImageService,

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

    fun uploadImage(image: MultipartFile, announcementId: String): AnnouncementView{
         return AuthenticationUtils.authenticate(userRepository){user ->
            announcementRepository.findByIdOrNull(announcementId).let { announcement ->
                announcement ?: throw NotFoundException("Anúncio não encontrado!")
                if (announcement.ownerUser.id != user.id) throw Exception("Você não tem permissão para modificar esse anúncio")
                imageService.uploadImage(image, false).let { image ->
                    announcement.images.add(image)
                }
                announcementRepository.save(announcement)
                announcementViewMapper.map(announcement)
            }
        }
    }

    fun deleteImage(form: DeleteImageAnnouncementForm ): AnnouncementView{
        return AuthenticationUtils.authenticate(userRepository){user ->
            announcementRepository.findByIdOrNull(form.announcementId).let { announcement ->
                announcement ?: throw NotFoundException("Anúncio não encontrado!")
                if (announcement.ownerUser.id != user.id) throw Exception("Você não tem permissão para modificar esse anúncio")
                val image = announcement.images.find { image ->
                    image.id == form.imageId
                } ?: throw NotFoundException("Imagem não encontrada!")
                imageService.deleteImage(form.imageId)
                announcement.images.remove(image)
                announcementRepository.save(announcement)
                announcementViewMapper.map(announcement)
            }
        }
    }
}