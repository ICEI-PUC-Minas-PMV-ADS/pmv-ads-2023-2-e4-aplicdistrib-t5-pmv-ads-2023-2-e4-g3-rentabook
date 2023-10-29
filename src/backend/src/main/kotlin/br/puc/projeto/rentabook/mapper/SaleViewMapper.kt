package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.service.RatingService
import org.springframework.stereotype.Component

@Component
class SaleViewMapper(
    private val announcementViewMapper: AnnouncementViewMapper,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val chatViewMapper: ChatViewMapper,
    private val ratingService: RatingService
) : Mapper <Sale, SaleView> {
    override fun map(t: Sale): SaleView {
        return SaleView(
            id = t.id ?: throw Exception("Registro de venda não localizado!"),
            announcement = announcementViewMapper.map(t.announcement),
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            createData = t.createData,
            startDate = t.startDate ?: throw Exception("Data de inicio invalida!"),
            endDate = t.endDate,
            value = t.value,
            lead = publicUserViewMapper.map(t.lead),
            rating = ratingService.getRatingByNegotiation(t.id),
            chat = chatViewMapper.map(t.chat),
            accepted = t.accepted,
            cancelled = t.cancelled,
        )
    }
}