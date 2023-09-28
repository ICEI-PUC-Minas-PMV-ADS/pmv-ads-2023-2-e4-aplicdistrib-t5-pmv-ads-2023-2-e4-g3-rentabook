package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.service.SaleService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/sales")
class SaleController(private val saleService: SaleService) {

    // Endpoint para criar uma venda
    @PostMapping("/create")
    fun createSale(@RequestBody saleForm: SaleForm): SaleView {
        return saleService.createSale(saleForm)
    }

    @PutMapping("{saleId}/undo")
    fun undoSale(@PathVariable saleId: String): SaleView {
        return saleService.undoSale(saleId)
    }

}
