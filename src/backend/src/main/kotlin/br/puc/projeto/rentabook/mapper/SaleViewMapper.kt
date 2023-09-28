package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.model.Sale

class SaleViewMapper : Mapper <Sale, SaleView> {
    override fun map(t: Sale): SaleView {
        return SaleView(
                id = t.id,
                announcement = t.announcement.id,
                createData = t.createData,
                value = t.value,
                buyerUser = t.buyerUser.id,
                rating = t.rating?.id,
                chat = t.chat?.id,
                accepted = t.accepted,
                cancelled = t.cancelled
        )
    }


}