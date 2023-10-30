package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.TradeView
import br.puc.projeto.rentabook.model.Trade
import br.puc.projeto.rentabook.repository.RatingRepository
import br.puc.projeto.rentabook.service.RatingService
import org.springframework.stereotype.Component

@Component
class TradeViewMapper(
    private val announcementViewMapper: AnnouncementViewMapper,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val ratingViewMapper: RatingViewMapper,
    private val chatViewMapper: ChatViewMapper,
    private val ratingRepository: RatingRepository,
): Mapper<Trade, TradeView> {


    override fun map(t: Trade): TradeView {
        val rating = ratingRepository.findByIdNegotiation(t.id!!).run {
            if (this != null) {
                ratingViewMapper.map(this)
            }
            else null
        }
        return TradeView(
            id = t.id,
            announcement = announcementViewMapper.map(t.announcement),
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            createData = t.createData,
            startDate = t.startDate ?: throw Exception("Data de inicio invalida!"),
            endDate = t.endDate,
            value = t.value,
            lead = publicUserViewMapper.map(t.lead),
            rating = rating,
            chat = chatViewMapper.map(t.chat),
            accepted = t.accepted,
            cancelled = t.cancelled,
        )
    }
}