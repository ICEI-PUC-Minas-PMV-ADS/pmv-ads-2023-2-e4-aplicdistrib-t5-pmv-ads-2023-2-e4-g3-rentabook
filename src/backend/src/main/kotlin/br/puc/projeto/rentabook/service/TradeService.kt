package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.SaleFormMapper
import br.puc.projeto.rentabook.mapper.SaleViewMapper
import br.puc.projeto.rentabook.mapper.TradeFormMapper
import br.puc.projeto.rentabook.mapper.TradeViewMapper
import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.model.Trade
import br.puc.projeto.rentabook.repository.*
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.Exception
import java.lang.IllegalStateException

@Service
class TradeService(
    private val mongoTemplate: MongoTemplate,
    private val tradeRepository: TradeRepository,
    private val tradeViewMapper: TradeViewMapper,
    private val tradeFormMapper: TradeFormMapper,
    private val userRepository: UserRepository,
    private val announcementRepository: AnnouncementRepository,
    private val chatRepository: ChatRepository,
) {

    fun create(form: TradeForm): TradeView {
        return AuthenticationUtils.authenticate(userRepository) {
            tradeRepository.save(tradeFormMapper.map(form)).run {
                if (announcement.ownerUser.id == it.id) {
                    throw Exception("O proprietario do livro não pode troca-lo")
                }
                if (!announcement.trade || !announcement.isAvailable) {
                    throw Exception("Este livro não esta disponivel para troca")
                }
                announcementRepository.save(announcement)
                tradeViewMapper.map(this)
            }
        }
    }

    fun get(id: String): TradeView? {
        return AuthenticationUtils.authenticate(userRepository) { _ ->
            val trade = tradeRepository.findById(id)
            if (trade.isPresent) {
                tradeViewMapper.map(trade.get())
            } else {
                null
            }
        }
    }

    fun getAll(pageable: Pageable): Page<TradeView> {
        return AuthenticationUtils.authenticate(userRepository) {
            tradeRepository.findAll(pageable)
                .map { tradeViewMapper.map(it) }
        }
    }

    fun getAllOwnTrades(pageable: Pageable): Page<TradeView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val query = Query()
                .with(pageable)
                .addCriteria(Criteria("accepted").isEqualTo(false))
                .addCriteria(Criteria("cancelled").isEqualTo(false))
                .addCriteria(Criteria("lead.id").isEqualTo(user.id ?: throw Exception("Id do usuário invalido")))

            val trades = mongoTemplate.find(query, Trade::class.java)
                .map { tradeViewMapper.map(it) }

            PageImpl(trades, pageable, trades.size.toLong())
        }
    }

    fun cancel(id: String): TradeView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val trade = tradeRepository.findById(id)
                .orElseThrow { NotFoundException("Troca não encontrada") }
            if (trade.ownerUser.id != user.id && trade.lead.id != user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (trade.cancelled && trade.accepted) {
                throw IllegalStateException("Esta troca não foi cancelada e não pode ser desfeita")
            }
            trade.chat.active = false
            chatRepository.save(trade.chat)
            trade.announcement.isAvailable = true
            trade.announcement.status = ""
            announcementRepository.save(trade.announcement)
            trade.cancelled = true
            tradeViewMapper.map(tradeRepository.save(trade))
        }
    }

    fun complete(id: String): TradeView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val trade = tradeRepository.findById(id)
                .orElseThrow { NotFoundException("Troca não encontrada") }
            if (trade.ownerUser.id != user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (trade.cancelled && trade.accepted) {
                throw IllegalStateException("Esta troca não foi cancelada e não pode ser desfeita")
            }
            trade.chat.active = false
            chatRepository.save(trade.chat)
            trade.announcement.isAvailable = false
            trade.announcement.status = Announcement.waitingSend
            announcementRepository.save(trade.announcement)
            trade.accepted = true
            tradeViewMapper.map(tradeRepository.save(trade))
        }
    }
}


