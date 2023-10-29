package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingView
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class RatingViewMapper(
    private val publicUserViewMapper: PublicUserViewMapper,
    private val cleanAnnouncementViewMapper: CleanAnnouncementViewMapper
) : Mapper<Rating, RatingView> {
    override fun map(t: Rating): RatingView {
        return RatingView(
            id = t.id,
            announcement = cleanAnnouncementViewMapper.map(t.announcement),
            idNegotiation = t.idNegotiation,
            message = t.message,
            negotiation = t.negotiation,
            owner = publicUserViewMapper.map(t.owner),
            stars = t.stars)
    }
}
