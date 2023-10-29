package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.service.SaleService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.cache.annotation.CacheEvict
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/sales")
class SaleController(
    private val saleService: SaleService
) {

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/create")
    fun create(@RequestBody form: SaleForm): SaleView {
        return saleService.create(form)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @GetMapping("/{id}")
    fun get(@PathVariable id: String): SaleView? {
        return saleService.get(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping
    fun getAll(pageable: Pageable): Page<SaleView> {
        return saleService.getAll(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/own")
    fun getAllOwnRents(pageable: Pageable): Page<SaleView> {
        return saleService.getAllOwnSales(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @PutMapping("/{id}/cancel")
    fun cancel(@PathVariable id: String): SaleView {
        return saleService.cancel(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @CacheEvict("Announcements", allEntries = true)
    @PutMapping("/{id}/complete")
    fun complete(@PathVariable id: String): SaleView {
        return saleService.complete(id)
    }
}
