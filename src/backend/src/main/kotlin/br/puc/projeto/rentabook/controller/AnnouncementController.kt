package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.service.AnnouncementService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController()
@RequestMapping("/announcements")
class AnnouncementController(
    private val announcementService: AnnouncementService,
) {

    /**
     * Lista os anuncios do usuário
     */

    @GetMapping
    fun getAllAnnouncement(pageable: Pageable): Page<AnnouncementView> {
        return announcementService.findAll(pageable)
    }

    /**
     * Cria um novo anuncio.
     */
    @PostMapping("/new")
    fun createAnnouncement(@RequestBody createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return announcementService.createAnnouncement(createAnnouncementForm)
    }

    @GetMapping("/available")
    fun getAnnouncementsAvailable(
        @PageableDefault(size = 5) pageable: Pageable
    ): Page<AnnouncementView> {
        return announcementService.findAllUsersBooksAvailableToNegotiate(pageable)
    }

    /**
     * Cria um novo anuncio.
     */
    @GetMapping("/availableToRent")
    fun getRentAnnouncements(pageable: Pageable): Page<AnnouncementView> {
        return announcementService.findAllBooksAvailableToRent(pageable)
    }

    /**
     * Aluga um livro.
     */
    @PostMapping("/rent")
    fun createAnnouncement(@RequestBody createRentForm: CreateRentForm): RentView {
        return announcementService.createRent(createRentForm)
    }

    /**
     * Faz a devolução de um livro alugado.
     */
    @PostMapping("/give_back")
    fun giveBackRent(@RequestBody giveBackForm: GiveBackForm) {
        return announcementService.giveBackRent(giveBackForm)
    }
}