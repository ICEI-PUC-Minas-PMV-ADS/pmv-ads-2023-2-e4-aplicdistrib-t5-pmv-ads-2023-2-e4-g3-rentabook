package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingForm
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class RatingFormMapper(
    private val userRepository: UserRepository,
) : Mapper<RatingForm, Rating> {
    override fun map(t: RatingForm): Rating {
        val authentication = SecurityContextHolder.getContext().authentication
        val lead = userRepository.findByEmail(authentication.name) ?: throw Exception("Usuário que ira alugar não localizado!")
        return Rating(
            ownerUser = lead,
            message = t.message,
            feedback = t.feedback,
        )
    }
}
