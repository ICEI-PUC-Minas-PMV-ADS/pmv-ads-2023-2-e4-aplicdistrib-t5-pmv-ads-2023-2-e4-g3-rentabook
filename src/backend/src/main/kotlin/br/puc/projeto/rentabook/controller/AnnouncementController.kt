package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.AnnouncementView
import br.puc.projeto.rentabook.dto.CreateAnnouncementForm
import br.puc.projeto.rentabook.dto.CreateRentForm
import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.service.AnnouncementService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController()
@RequestMapping("/announcement")
class AnnouncementController(
    private val announcementService: AnnouncementService,
) {

    @PostMapping("/new")
    fun createAnnouncement(@RequestBody createAnnouncementForm: CreateAnnouncementForm): AnnouncementView {
        return announcementService.createAnnouncement(createAnnouncementForm)
    }

    @PostMapping("/rent")
    fun createAnnouncement(@RequestBody createRentForm: CreateRentForm): RentView {
        return announcementService.createRent(createRentForm)
    }
}