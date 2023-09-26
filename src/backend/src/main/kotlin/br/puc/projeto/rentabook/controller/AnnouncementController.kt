package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.service.AnnouncementService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.*

@RestController()
@RequestMapping("/announcements")
class AnnouncementController(
    private val announcementService: AnnouncementService,

) {

    /**
     * Lista os anuncios do usuário
     */

    @GetMapping
    fun getAllAnnouncement(pageable: Pageable): Page<AnnouncementViewTest> {
        return announcementService.findAll(pageable)
    }

    @GetMapping("/list")
    fun getList(pageable: Pageable,
                @RequestParam
                city : String?,
                @RequestParam
                bookId : String?,
                ) : Page<AnnouncementView> {
        return announcementService.list(pageable, city, bookId)
    }
    /**
     * Cria um novo anuncio.
     */
    @PostMapping("/new")
    fun createAnnouncement(@RequestBody createAnnouncementForm: CreateAnnouncementForm): AnnouncementViewTest {
        return announcementService.createAnnouncement(createAnnouncementForm)
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

    @PostMapping("/cancel/{announcementId}")
    fun cancelAnnouncement(@PathVariable announcementId: String) {
        announcementService.cancelAnnouncement(announcementId)
    }

}