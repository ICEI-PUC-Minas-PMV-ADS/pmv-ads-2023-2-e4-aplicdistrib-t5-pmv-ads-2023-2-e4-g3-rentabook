package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.model.Rent
import br.puc.projeto.rentabook.service.RatingService
import org.springframework.stereotype.Component

@Component
class RentViewMapper(
    private val announcementViewMapper: AnnouncementViewMapper,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val chatViewMapper: ChatViewMapper,
    private val ratingService: RatingService
): Mapper<Rent, RentView> {
    override fun map(t: Rent): RentView {
        return RentView(
            id = t.id ?: throw Exception("Registro de aluguel não localizado!"),
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