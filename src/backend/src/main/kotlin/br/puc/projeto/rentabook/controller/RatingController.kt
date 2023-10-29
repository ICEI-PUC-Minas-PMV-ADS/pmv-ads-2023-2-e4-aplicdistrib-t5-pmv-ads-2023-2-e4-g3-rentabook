package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.RatingForm
import br.puc.projeto.rentabook.dto.RatingView
import br.puc.projeto.rentabook.service.RatingService
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/rating")
class RatingController(
    private val ratingService: RatingService
) {
    @PostMapping
    fun rating(@RequestBody @Valid form: RatingForm): RatingView {
        return ratingService.createRating(form)
    }

    @GetMapping("/{id}")
    fun getRatingById(@PathVariable id: String): RatingView {
        return ratingService.getRatingById(id)
    }

    @GetMapping("/negotiation/{id}")
    fun getRatingByNegotiation(@PathVariable id: String): RatingView {
        return ratingService.getRatingByNegotiation(id)
    }

    @GetMapping("/announcement/{id}")
    fun getRatingsByAnnouncement(
        @PathVariable id: String,
        pageable: Pageable
    ): Page<RatingView> {
        return ratingService.getRatingByAnnouncement(id, pageable)
    }
}