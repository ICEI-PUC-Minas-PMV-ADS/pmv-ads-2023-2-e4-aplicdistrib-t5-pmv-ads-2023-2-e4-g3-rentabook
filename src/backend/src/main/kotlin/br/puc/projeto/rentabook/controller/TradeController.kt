package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.dto.TradeForm
import br.puc.projeto.rentabook.dto.TradeView
import br.puc.projeto.rentabook.service.TradeService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/trades")
class TradeController(
    private val tradeService: TradeService,
) {

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/create")
    fun create(@RequestBody form: TradeForm): TradeView {
        return tradeService.create(form)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/{id}")
    fun get(@PathVariable id: String): TradeView? {
        return tradeService.get(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping
    fun getAll(pageable: Pageable): Page<TradeView> {
        return tradeService.getAll(pageable)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PutMapping("{id}/cancel")
    fun cancel(@PathVariable id: String): TradeView {
        return tradeService.cancel(id)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PutMapping("{id}/complete")
    fun complete(@PathVariable id: String): TradeView {
        return tradeService.complete(id)
    }
}
