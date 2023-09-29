package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.RentForm
import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.service.RentService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/rents")
class RentController(private val rentService: RentService) {

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/create")
    fun create(@RequestBody form: RentForm): RentView {
        return rentService.create(form)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/{id}")
    fun get(@PathVariable id: String): RentView? {
        return rentService.get(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping
    fun getAll(pageable: Pageable): Page<RentView> {
        return rentService.getAll(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PutMapping("{id}/cancel")
    fun cancel(@PathVariable id: String): RentView {
        return rentService.cancel(id)
    }
}
