package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.RatingForm
import br.puc.projeto.rentabook.exception.BadRequestException
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.exception.ResourceAlreadyExistsException
import br.puc.projeto.rentabook.exception.UnauthorizedException
import br.puc.projeto.rentabook.model.*
import br.puc.projeto.rentabook.repository.*
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class RatingFormMapper(
    private val userRepository: UserRepository,
    private val rentRepository: RentRepository,
    private val saleRepository: SaleRepository,
    private val tradeRepository: TradeRepository,
    private val announcementRepository: AnnouncementRepository,
    private val ratingRepository: RatingRepository

) : Mapper<RatingForm, Rating> {
    override fun map(t: RatingForm): Rating {
        val rent = if (t.negotiation == Negotiations.RENT) {
            rentRepository.findByIdOrNull(t.idNegotiation)
                ?: throw NotFoundException("Não foi possível encontrar a negociação para avaliar")
        } else null
        val trade = if (t.negotiation == Negotiations.TRADE) {
            tradeRepository.findByIdOrNull(t.idNegotiation)
                ?: throw NotFoundException("Não foi possível encontrar a negociação para avaliar")
        } else null
        val sale = if (t.negotiation == Negotiations.SALE) {
            saleRepository.findByIdOrNull(t.idNegotiation)
                ?: throw NotFoundException("Não foi possível encontrar a negociação para avaliar")
        } else null

        if (rent != null && !rent.accepted)
            throw BadRequestException("Não é possível avaliar neogiações que não foram aceitas!")

        if (trade != null && !trade.accepted)
            throw BadRequestException("Não é possível avaliar neogiações que não foram aceitas!")

        if (sale != null && !sale.accepted)
            throw BadRequestException("Não é possível avaliar neogiações que não foram aceitas!")



        val announcement = if (rent != null) {
            announcementRepository.findByIdOrNull(rent.announcement.id)
        } else if (trade != null) {
            announcementRepository.findByIdOrNull(trade.announcement.id)
        } else if (sale != null) {
            announcementRepository.findByIdOrNull(sale.announcement.id)
        } else null

        announcement ?: throw NotFoundException("Não foi possível encontrar o anúncio para avaliação ")


        return AuthenticationUtils.authenticate(userRepository) {
            if (rent != null && rent.lead.id != it.id) {
                throw UnauthorizedException("Não autorizado!")
            }
            if (trade != null && trade.lead.id != it.id) {
                throw UnauthorizedException("Não autorizado!")
            }
            if (sale != null && sale.lead.id != it.id) {
                throw UnauthorizedException("Não autorizado!")
            }

            val checkRating = ratingRepository.findByOwnerIdAndIdNegotiation(it.id!!, t.idNegotiation)
            if (checkRating != null) {
                throw ResourceAlreadyExistsException("Você já avaliou essa negociação!")
            }
            Rating(
                message = t.message,
                negotiation = t.negotiation,
                idNegotiation = t.idNegotiation,
                stars = t.stars,
                announcement = announcement,
                owner = it
            )
        }
    }
}
