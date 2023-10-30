package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.*
import br.puc.projeto.rentabook.model.Address
import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.repository.*
import br.puc.projeto.rentabook.utils.TextUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.TextCriteria
import org.springframework.data.repository.findByIdOrNull
import org.springframework.data.support.PageableExecutionUtils
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestParam
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
    private val cleanAnnouncementViewMapper: CleanAnnouncementViewMapper,
    private val addressRepository: AddressRepository
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

    fun findAnnouncementById(announcementId: String): CleanAnnouncementView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            cleanAnnouncementViewMapper.map(announcementRepository.findById(announcementId)
                .orElseThrow { throw java.lang.Exception("Invalid announcement id!") })
        }
    }

    fun findAllOwn(pageable: Pageable) : Page<CleanAnnouncementView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val announcements = announcementRepository.findAllByOwnerUser_Id(user.id!!, pageable)
                .toList()

            val supplier = fun(): Long { return announcements.size.toLong() }

            PageableExecutionUtils.getPage(announcements, pageable, supplier)
                .map { t -> cleanAnnouncementViewMapper.map(t) }
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

//    fun giveBackRent(giveBackForm: GiveBackForm) {
//        return AuthenticationUtils.authenticate(userRepository) {
//            val rent =
//                rentRepository.findById(giveBackForm.id).orElseThrow { throw Exception("Id de aluguel invalido!") }
//            rent.rating = ratingRepository.save(
//                Rating(
//                    ownerUser = it,
//                    message = giveBackForm.ratingMessage,
//                    feedback = giveBackForm.ratingFeedback,
//                )
//            )
//            rent.announcement.isAvailable = true
//            announcementRepository.save(rent.announcement)
//            rentRepository.save(rent)
//        }
//    }

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
        onlyAvailable: Boolean? = true,
        pageable: Pageable
    ): Page<CleanAnnouncementView> {

        val query = Query()

        if (!city.isNullOrBlank()) {
            val normalizedCity = TextUtils.normalizeString(city)
            val addressesIds = addressRepository.findByNormalizedCityNameContaining(normalizedCity).map {
                it.id
            }
            val criteriaList = addressesIds.map {
                Criteria.where("locationId").`is`(it)
            }
            query.addCriteria(Criteria().orOperator(criteriaList))
        }

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
        if (onlyAvailable == false) {
            query.addCriteria(Criteria.where("isAvailable").`is`(false))
        } else {
            query.addCriteria(Criteria.where("isAvailable").`is`(true))
        }


        val resultsTotal = mongoTemplate.find(query, Announcement::class.java)
            .toList().size.toLong()

        val results = mongoTemplate.find(query.with(pageable), Announcement::class.java)
            .toList()

        val supplier = fun(): Long { return resultsTotal }

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

    fun getPublicAnnouncementsDetail(id: String): CleanAnnouncementView {
        return cleanAnnouncementViewMapper.map(findById(id))
    }

}