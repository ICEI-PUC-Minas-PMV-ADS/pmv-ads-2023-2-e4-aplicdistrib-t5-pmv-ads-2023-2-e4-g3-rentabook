package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.mapper.CleanAnnouncementViewMapper
import br.puc.projeto.rentabook.service.AnnouncementService
import br.puc.projeto.rentabook.service.RatingService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.websocket.server.PathParam
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController()
@RequestMapping("/announcements")
class AnnouncementController(
    private val announcementService: AnnouncementService,
    private val ratingService: RatingService,
) {

    /**
     * Lista os anuncios do usuário
     */

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping
    fun getAllAnnouncement(pageable: Pageable): Page<AnnouncementView> {
        return announcementService.findAll(pageable)
    }

    /**
     * Busca uma anuncio
     */

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/clean/{id}")
    fun getAnnouncementCleanView(@PathVariable id: String): CleanAnnouncementView {
        return announcementService.findAnnouncementById(id)
    }

    /**
     * Cria um novo anuncio.
     */
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @PostMapping("/new")
    fun createAnnouncement(@RequestBody createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return announcementService.createAnnouncement(createAnnouncementForm)
    }

    /**
     * Atualiza um anuncio.
     */
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @PostMapping("/{id}")
    fun createAnnouncement(@PathVariable id: String, @RequestBody createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return announcementService.updateAnnouncement(id, createAnnouncementForm)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/own")
    fun getMyOwnAnnouncementsAvailable(
        @PageableDefault(size = 12) pageable: Pageable
    ): Page<CleanAnnouncementView> {
        return announcementService.findAllOwn(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/requested")
    fun getMyRequestedAnnouncements(
        @RequestParam filterBy: String?,
    ): List<CleanAnnouncementView> {
        return announcementService.getMyRequestedAnnouncements(filterBy)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/available")
    fun getAnnouncementsAvailable(
        @PageableDefault(size = 5) pageable: Pageable
    ): Page<AnnouncementView> {
        return announcementService.findAllUsersBooksAvailableToNegotiate(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/avaliabeToTrade")
    fun getTradeAnnoucemnets(pageable: Pageable): Page<AnnouncementView> {
        return announcementService.findAllBooksAvaliableToTrade(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/avaliabeToSale")
    fun getSaleAnnoucemnets(pageable: Pageable): Page<AnnouncementView> {
        return announcementService.findAllBooksAvaliableToSale(pageable)
    }

    /**
     * Cria um novo anuncio.
     */
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/availableToRent")
    fun getRentAnnouncements(pageable: Pageable): Page<AnnouncementView> {
        return announcementService.findAllBooksAvailableToRent(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @PostMapping("/images/{id}")
    fun uploadImage(@RequestBody image: MultipartFile, @PathVariable id: String): AnnouncementView {
        return announcementService.uploadImage(image, id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @DeleteMapping("/images")
    fun deleteImage(@RequestBody form: DeleteImageAnnouncementForm): AnnouncementView {
        return announcementService.deleteImage(form)
    }

    @GetMapping("/find")
    @Cacheable("Announcements")
    fun list(
        @RequestParam city: String?,
        @RequestParam bookId: String?,
        @RequestParam rent: Boolean?,
        @RequestParam sale: Boolean?,
        @RequestParam trade: Boolean?,
        @RequestParam onlyAvailable: Boolean?,
        @PageableDefault(
            size = 12
        ) pageable: Pageable
    ): Page<CleanAnnouncementView> {
        return announcementService.findByFilters(city, bookId, rent, sale, trade, onlyAvailable, pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/{id}")
    fun getAnnouncementsDetail(
        @RequestParam id: String
    ): AnnouncementView {
        return announcementService.detailService(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/{id}/status")
    fun setAnnouncementStatus(
        @PathVariable id: String,
        @RequestBody form: UpdateAnnouncementStatusForm,
    ): CleanAnnouncementView {
        return announcementService.setAnnouncementStatus(id, form.status)
    }

    @GetMapping("public/{id}")
    fun getPublicAnnouncementsDetail(
        @RequestParam id: String
    ): CleanAnnouncementView {
        return announcementService.getPublicAnnouncementsDetail(id)
    }
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/rate")
    @CacheEvict("Announcements", allEntries = true)
    fun createRating(@RequestBody ratingForm: RatingForm): RatingView {
        return ratingService.createRating(ratingForm)
    }
}