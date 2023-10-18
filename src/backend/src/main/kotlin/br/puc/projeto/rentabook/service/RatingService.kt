package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.RatingForm
import br.puc.projeto.rentabook.dto.RatingView
import br.puc.projeto.rentabook.mapper.RatingFormMapper
import br.puc.projeto.rentabook.mapper.RatingViewMapper
import br.puc.projeto.rentabook.repository.RatingRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.stereotype.Service

@Service
class RatingService(
    private val userRepository: UserRepository,
    private val ratingRepository: RatingRepository,
    private val ratingFormMapper: RatingFormMapper,
    private val ratingViewMapper: RatingViewMapper,
) {
    fun createRating(ratingForm: RatingForm): RatingView {
        return AuthenticationUtils.authenticate(userRepository) {
            ratingRepository.save(ratingFormMapper.map(ratingForm)).run {
                ratingViewMapper.map(this)
            }
        }
    }
}