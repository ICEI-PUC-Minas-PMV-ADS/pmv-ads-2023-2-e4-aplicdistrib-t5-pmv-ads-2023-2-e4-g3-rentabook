package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.TradeView
import br.puc.projeto.rentabook.model.Trade
import org.springframework.stereotype.Component

@Component
class TradeViewMapper(
    private val announcementViewMapper: AnnouncementViewMapper,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val ratingViewMapper: RatingViewMapper,
    private val chatViewMapper: ChatViewMapper,
): Mapper<Trade, TradeView> {
    override fun map(t: Trade): TradeView {
        return TradeView(
            id = t.id ?: throw Exception("Registro de troca não localizado!"),
            announcement = announcementViewMapper.map(t.announcement),
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            createData = t.createData,
            startDate = t.startDate ?: throw Exception("Data de inicio invalida!"),
            endDate = t.endDate,
            value = t.value,
            lead = publicUserViewMapper.map(t.lead),
            rating = if (t.rating != null)
                ratingViewMapper.map(t.rating ?: throw Exception("Avaliação não encontrada"))
            else null,
            chat = chatViewMapper.map(t.chat),
            accepted = t.accepted,
            cancelled = t.cancelled,
        )
    }
}