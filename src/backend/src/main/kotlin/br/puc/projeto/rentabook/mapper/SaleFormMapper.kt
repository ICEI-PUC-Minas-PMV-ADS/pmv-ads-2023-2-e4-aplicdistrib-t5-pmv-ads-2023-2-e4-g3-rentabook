package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.service.AnnouncementService
import br.puc.projeto.rentabook.service.UserService
import org.springframework.stereotype.Component

@Component
class SaleFormMapper(private val announcementService: AnnouncementService, private val userService: UserService): Mapper <SaleForm, Sale> {
    override fun map(t: SaleForm): Sale {
         return Sale (
                 announcement = announcementService.findById(t.announcement),
                 value = t.value,
                 buyerUser = userService.findById(t.buyerUser),
                 chat = null,
                 accepted = null,
                 rating = null,

         )
    }

}