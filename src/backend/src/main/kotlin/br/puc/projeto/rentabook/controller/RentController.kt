package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.service.RentService
import br.puc.projeto.rentabook.service.SaleService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/rent")
class RentController(private val rentService: RentService) {


    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("{id}/undo")
    fun cancel(@PathVariable id: String): RentView {
        return rentService.cancel(id)
    }

}
