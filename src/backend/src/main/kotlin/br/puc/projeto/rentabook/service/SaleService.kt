package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.RentForm
import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.RentFormMapper
import br.puc.projeto.rentabook.mapper.RentViewMapper
import br.puc.projeto.rentabook.mapper.SaleFormMapper
import br.puc.projeto.rentabook.mapper.SaleViewMapper
import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Rent
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.repository.*
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.Exception
import java.lang.IllegalStateException

@Service
class SaleService(
    private val mongoTemplate: MongoTemplate,
    private val saleRepository: SaleRepository,
    private val saleViewMapper: SaleViewMapper,
    private val saleFormMapper: SaleFormMapper,
    private val userRepository: UserRepository,
    private val announcementRepository: AnnouncementRepository,
    private val chatRepository: ChatRepository,
) {

    fun create(form: SaleForm): SaleView {
        return AuthenticationUtils.authenticate(userRepository) {
            saleRepository.save(saleFormMapper.map(form)).run {
                if (announcement.ownerUser.id == it.id) {
                    throw Exception("O proprietario do livro não pode compra-lo")
                }
                if (!announcement.sale || !announcement.isAvailable) {
                    throw Exception("Este livro não esta disponivel para venda")
                }
                announcementRepository.save(announcement)
                saleViewMapper.map(this)
            }
        }
    }

    fun get(id: String): SaleView? {
        return AuthenticationUtils.authenticate(userRepository) { _ ->
            val sale = saleRepository.findById(id)
            if (sale.isPresent) {
                saleViewMapper.map(sale.get())
            } else {
                null
            }
        }
    }

    fun getAll(pageable: Pageable): Page<SaleView> {
        return AuthenticationUtils.authenticate(userRepository) {
            saleRepository.findAll(pageable)
                .map { saleViewMapper.map(it) }
        }
    }

    fun getAllOwnSales(pageable: Pageable): Page<SaleView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val query = Query()
                .with(pageable)
                .addCriteria(Criteria("accepted").isEqualTo(false))
                .addCriteria(Criteria("cancelled").isEqualTo(false))
                .addCriteria(Criteria("lead.id").isEqualTo(user.id ?: throw Exception("Id do usuário invalido")))

            val sales = mongoTemplate.find(query, Sale::class.java)
                .map { saleViewMapper.map(it) }

            PageImpl(sales, pageable, sales.size.toLong())
        }
    }

    fun cancel(id: String): SaleView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val sale = saleRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (sale.ownerUser.id != user.id && sale.lead.id != user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (sale.cancelled && sale.accepted) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }
            sale.chat.active = false
            chatRepository.save(sale.chat)
            sale.announcement.isAvailable = true
            sale.announcement.status = ""
            announcementRepository.save(sale.announcement)
            sale.cancelled = true
            saleViewMapper.map(saleRepository.save(sale))
        }
    }

    fun complete(id: String): SaleView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val sale = saleRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (sale.ownerUser.id != user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (sale.cancelled && sale.accepted) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }
            sale.chat.active = false
            chatRepository.save(sale.chat)
            sale.announcement.isAvailable = false
            sale.announcement.status = Announcement.waitingSend
            announcementRepository.save(sale.announcement)
            sale.accepted = true
            saleViewMapper.map(saleRepository.save(sale))
        }
    }
}



