package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RatingRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.*
import br.puc.projeto.rentabook.model.Announcement
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.repository.findByIdOrNull
import org.springframework.data.support.PageableExecutionUtils
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.text.Normalizer
import java.util.function.LongSupplier
import java.util.function.Supplier
import kotlin.Exception

@Service
class AnnouncementService(
    private val announcementRepository: AnnouncementRepository,
    private val userRepository: UserRepository,
    private val createAnnouncementFormMapper: CreateAnnouncementFormMapper,
    private val announcementViewMapper: AnnouncementViewMapper,
    private val rentRepository: RentRepository,
    private val createRentFormMapper: RentFormMapper,
    private val rentViewMapper: RentViewMapper,
    private val ratingRepository: RatingRepository,
    private val imageService: ImageService,
    private val mongoTemplate: MongoTemplate,
    private val cleanAnnouncementViewMapper: CleanAnnouncementViewMapper
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
        return AuthenticationUtils.authenticate(userRepository) { userIt ->
            val announcementViewList = announcementRepository.findAllByRentTrue(pageable)
                .filter { it.isAvailable && it.ownerUser.id != userIt.id }
                .map { announcementViewMapper.map(it) }
                .toList()
            getCustomPage(announcementViewList, pageable)
        }
    }

    fun findAllBooksAvaliableToTrade(pageable: Pageable): Page<AnnouncementView> {
        return AuthenticationUtils.authenticate(userRepository) { userIt ->
            val annoucemnetViewList = announcementRepository.findAllByTradeTrue(pageable)
                .filter { it.isAvailable && it.ownerUser.id != userIt.id }
                .map { announcementViewMapper.map(it) }
                .toList()
            getCustomPage(annoucemnetViewList, pageable)
        }
    }

    fun findAllBooksAvaliableToSale(pageable: Pageable): Page<AnnouncementView> {
        return AuthenticationUtils.authenticate(userRepository) { userIt ->
            val annoucemnetViewList = announcementRepository.findAllBySaleTrue(pageable)
                .filter { it.isAvailable && it.ownerUser.id != userIt.id }
                .map { announcementViewMapper.map(it) }
                .toList()
            getCustomPage(annoucemnetViewList, pageable)
        }
    }

    fun createRent(createRentForm: RentForm): RentView {
        return AuthenticationUtils.authenticate(userRepository) {
            rentRepository.save(createRentFormMapper.map(createRentForm)).run {
                announcement.isAvailable = false
                announcementRepository.save(announcement)
                rentViewMapper.map(this)
            }
        }
    }

    fun findAllUsersBooksAvailableToNegotiate(pageable: Pageable): Page<AnnouncementView> {
        return AuthenticationUtils.authenticate(userRepository) {
            val announcementList = announcementRepository.findAllByIsAvailableTrue(pageable)
                .filter { it.ownerUser.id != it.id }
                .toList()
                .map { announcementViewMapper.map(it) }
            PageImpl(announcementList, pageable, announcementList.size.toLong())
        }
    }

    fun giveBackRent(giveBackForm: GiveBackForm) {
        return AuthenticationUtils.authenticate(userRepository) {
            val rent =
                rentRepository.findById(giveBackForm.id).orElseThrow { throw Exception("Id de aluguel invalido!") }
            rent.rating = ratingRepository.save(
                Rating(
                    ownerUser = it,
                    message = giveBackForm.ratingMessage,
                    feedback = giveBackForm.ratingFeedback,
                )
            )
            rent.announcement.isAvailable = true
            announcementRepository.save(rent.announcement)
            rentRepository.save(rent)
        }
    }

    fun uploadImage(image: MultipartFile, announcementId: String): AnnouncementView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
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

    fun deleteImage(form: DeleteImageAnnouncementForm): AnnouncementView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
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

    fun findByFilters(
        city: String?,
        bookId: String?,
        rent: Boolean?,
        sale: Boolean?,
        trade: Boolean?,
        pageable: Pageable
    ): Page<CleanAnnouncementView> {
        val query = Query().with(pageable)

        if (!bookId.isNullOrBlank()) {
            query.addCriteria(Criteria.where("bookId").`is`(bookId))
        }

        if (rent != null) {
            query.addCriteria(Criteria.where("rent").`is`(rent))
        }

        if (sale != null) {
            query.addCriteria(Criteria.where("sale").`is`(sale))
        }

        if (trade != null) {
            query.addCriteria(Criteria.where("trade").`is`(trade))
        }

        var results = mongoTemplate.find(query, Announcement::class.java)
            .toList()

        if (!city.isNullOrBlank()){
            val sortedList = results.filter {
                normalizeString(city) == normalizeString(it.location.city)
            }
            results = sortedList
        }

        val supplier = fun(): Long { return mongoTemplate.count(query, Announcement::class.java) }
        return PageableExecutionUtils.getPage(results, pageable, supplier)
            .map { t -> cleanAnnouncementViewMapper.map(t) }
    }

    fun findById(id: String): Announcement {
        return announcementRepository.findByIdOrNull(id) ?: throw NotFoundException("Anúncio não encontrado")
    }

    fun detailService(id: String): AnnouncementView {
        return AuthenticationUtils.authenticate(userRepository) {
            announcementViewMapper.map(announcementRepository.findById(id).orElseThrow())
        }
    }

    fun <R> getCustomPage(list: List<R>, pageable: Pageable): Page<R> {
        val startIndex = pageable.pageNumber * pageable.pageSize
        val endIndex = (startIndex + pageable.pageSize).coerceAtMost(list.size)

        val pageList = list.subList(startIndex, endIndex)

        return PageImpl(pageList, pageable, list.size.toLong())
    }

    fun normalizeString(s: String): String {
        return Normalizer.normalize(s, Normalizer.Form.NFD)
            .replace("[^\\p{ASCII}]".toRegex(), "")
            .replace(" ","")
            .lowercase()
            .trim()
    }
}