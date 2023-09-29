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
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.SaleRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.IllegalStateException

@Service
class SaleService(
    private val saleRepository: SaleRepository,
    private val saleViewMapper: SaleViewMapper,
    private val saleFormMapper: SaleFormMapper,
    private val userRepository: UserRepository,
    private val announcementRepository: AnnouncementRepository,
) {

    fun create(form: SaleForm): SaleView {
        return AuthenticationUtils.authenticate(userRepository) {
            saleRepository.save(saleFormMapper.map(form)).run {
                announcement.isAvailable = false
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
        return AuthenticationUtils.authenticate(userRepository) { user ->
            saleRepository.findAll(pageable)
                .map { saleViewMapper.map(it) }
        }
    }

    fun cancel(id: String): SaleView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val sale = saleRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (!sale.cancelled) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }
            sale.announcement.isAvailable = true
            announcementRepository.save(sale.announcement)
            sale.cancelled = true
            saleViewMapper.map(saleRepository.save(sale))
        }
    }
    fun complete(id: String): SaleView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val sale = saleRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (!sale.cancelled) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }
            sale.announcement.isAvailable = false
            announcementRepository.save(sale.announcement)
            sale.accepted = true
            saleViewMapper.map(saleRepository.save(sale))
        }
    }
}



