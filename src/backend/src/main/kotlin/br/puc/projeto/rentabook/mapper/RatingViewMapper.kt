package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingView
import br.puc.projeto.rentabook.model.Rating
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class RatingViewMapper(
    private val userRepository: UserRepository,
    private val publicUserViewMapper: PublicUserViewMapper,
) : Mapper<Rating, RatingView> {
    override fun map(t: Rating): RatingView {
        val authentication = SecurityContextHolder.getContext().authentication
        val lead = userRepository.findByEmail(authentication.name) ?: throw Exception("Usuário que ira alugar não localizado!")
        return RatingView(
            id = t.id ?: throw Exception("Id de avaliação inválido!"),
            ownerUser = publicUserViewMapper.map(lead),
            message = t.message,
            feedback = t.feedback,
        )
    }
}
