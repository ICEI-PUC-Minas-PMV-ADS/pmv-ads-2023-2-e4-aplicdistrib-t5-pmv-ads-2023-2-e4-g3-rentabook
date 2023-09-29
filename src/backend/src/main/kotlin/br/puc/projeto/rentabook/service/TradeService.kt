package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.dto.TradeForm
import br.puc.projeto.rentabook.dto.TradeView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.TradeViewMapper
import br.puc.projeto.rentabook.repository.TradeRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.IllegalStateException

@Service
class TradeService(private val tradeRepository: TradeRepository, private val tradeViewMapper: TradeViewMapper, private val userRepository: UserRepository, private val announcementService: AnnouncementService) {



    @Transactional
    fun cancel(id: String): TradeView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val trade = tradeRepository.findById(id)
                    .orElseThrow { NotFoundException("Venda não encontrada") }

            if (!trade.cancelled) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }


            trade.cancelled = true
           tradeViewMapper.map(tradeRepository.save(trade))
        }
    }




}



