package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.service.AnnouncementService
import br.puc.projeto.rentabook.service.RatingService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
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
     * Cria um novo anuncio.
     */
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/new")
    fun createAnnouncement(@RequestBody createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return announcementService.createAnnouncement(createAnnouncementForm)
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

    /**
     * Faz a devolução de um livro alugado.
     */
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/give_back")
    fun giveBackRent(@RequestBody giveBackForm: GiveBackForm) {
        return announcementService.giveBackRent(giveBackForm)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/images/{id}")
    fun uploadImage(@RequestBody image: MultipartFile, @PathVariable id: String): AnnouncementView {
        return announcementService.uploadImage(image, id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @DeleteMapping("/images")
    fun deleteImage(@RequestBody form: DeleteImageAnnouncementForm): AnnouncementView {
        return announcementService.deleteImage(form)
    }

    @GetMapping("/find")
    fun list(
        @RequestParam city: String?,
        @RequestParam bookId: String?,
        @RequestParam rent: Boolean?,
        @RequestParam sale: Boolean?,
        @RequestParam trade: Boolean?,
        pageable: Pageable
    ): Page<AnnouncementView> {
        return announcementService.findByFilters(city, bookId, rent, sale, trade, pageable)
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
    @PostMapping("/rate")
    fun createRating(@RequestBody ratingForm: RatingForm): RatingView {
        return ratingService.createRating(ratingForm)
    }
}