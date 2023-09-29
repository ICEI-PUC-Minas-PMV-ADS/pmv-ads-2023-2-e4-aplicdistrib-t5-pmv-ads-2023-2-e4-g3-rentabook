package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingView
import br.puc.projeto.rentabook.model.Rating
import org.springframework.stereotype.Component

@Component
class RatingViewMapper : Mapper<Rating, RatingView> {
    override fun map(t: Rating): RatingView {
        return RatingView(
            id = t.id ?: throw Exception("Id de avaliação inválido!"),
            announcementId = t.announcementId,
            ownerUser = t.ownerUser,
            renterUser = t.renterUser,
            rating = t.rating,
            comments = t.comments,
            date = t.date,
            time = t.time
        )
    }
}
