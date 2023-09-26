package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.model.Rent
import org.springframework.stereotype.Component

@Component
class RentViewMapper(
        private val announcementViewTestMapper: AnnouncementViewTestMapper,
        private val publicUserViewMapper: PublicUserViewMapper,
        private val ratingViewMapper: RatingViewMapper,
        private val chatViewMapper: ChatViewMapper,
): Mapper<Rent, RentView> {
    override fun map(t: Rent): RentView {
        return RentView(
            id = t.id ?: throw Exception("Registro de aluguel não localizado!"),
            announcement = announcementViewTestMapper.map(t.announcement),
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            createData = t.createData,
            startDate = t.startDate,
            endDate = t.endDate,
            value = t.value,
            renterUser = publicUserViewMapper.map(t.renterUser),
            rating = if (t.rating != null)
                ratingViewMapper.map(t.rating ?: throw Exception("Avaliação não encontrada"))
            else null,
            chat = chatViewMapper.map(t.chat),
            accepted = t.accepted,
        )
    }
}