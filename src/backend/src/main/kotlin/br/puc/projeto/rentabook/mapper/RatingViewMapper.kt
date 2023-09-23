package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingView
import br.puc.projeto.rentabook.model.Rating
import org.springframework.stereotype.Component
import java.lang.Exception

@Component
class RatingViewMapper: Mapper<Rating, RatingView> {
    override fun map(t: Rating): RatingView {
        return RatingView(
            id = t.id ?: throw Exception("Id de avaliação invalido!"),
        )
    }
}