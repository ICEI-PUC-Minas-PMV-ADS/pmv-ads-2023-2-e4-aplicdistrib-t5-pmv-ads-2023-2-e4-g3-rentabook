package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingForm
import br.puc.projeto.rentabook.model.Rating
import org.springframework.stereotype.Component

@Component
class RatingFormMapper : Mapper<RatingForm, Rating> {
    override fun map(t: RatingForm): Rating {
        return Rating(
            announcementId = t.announcementId,
            rating = t.rating,
            comments = t.comments,
            date = t.date,
            time = t.time
        )
    }
}
