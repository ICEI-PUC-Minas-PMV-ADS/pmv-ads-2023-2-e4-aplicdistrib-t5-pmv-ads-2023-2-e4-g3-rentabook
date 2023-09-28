package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.SaleFormMapper
import br.puc.projeto.rentabook.mapper.SaleViewMapper
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.SaleRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.annotation.Id
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.IllegalStateException

@Service
class SaleService(private val saleRepository: SaleRepository, private val saleFormMapper: SaleFormMapper, private val saleViewMapper: SaleViewMapper, private val userRepository: UserRepository, private val announcementService: AnnouncementService) {

    @Transactional
    fun createSale(saleForm: SaleForm): SaleView {

        val createdSale = saleRepository.save(saleFormMapper.map(saleForm))



        return saleViewMapper.map(createdSale)
    }

    @Transactional
    fun undoSale(saleId: String): SaleView {
        val sale = saleRepository.findById(saleId)
                .orElseThrow { NotFoundException("Venda não encontrada") }

        if (!sale.cancelled) {
            throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
        }


        sale.cancelled = true
        return saleViewMapper.map(saleRepository.save(sale))
    }

    fun getUnreadedRequests(pageable: Pageable): Page<SaleView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->

            saleRepository.findByAcceptedAndAnnouncementOwnerUserId(
                    accepted = null,
                    ownerUser = user.id,
                    pageable = pageable).map { t ->
                saleViewMapper.map(t)
            }
        }

    }

    fun acceptRequest(id: String): SaleView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val sale = saleRepository.findByIdOrNull(
                    id
            ) ?: throw NotFoundException("Venda não encontrada")
            if (sale.announcement.ownerUser.id != user.id) throw Exception("Não autorizado")
            sale.accepted = true

            saleViewMapper.map(saleRepository.save(sale))

        }


    }

    fun denyRequest(id: String): SaleView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val sale = saleRepository.findByIdOrNull(
                    id
            ) ?: throw NotFoundException("Venda não encontrada")
            if (sale.announcement.ownerUser.id != user.id) throw Exception("Não autorizado")
            sale.accepted = false

            saleViewMapper.map(saleRepository.save(sale))

        }


    }

    fun findByOwnerUser(pageable: Pageable): Page<SaleView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            saleRepository.findByOwnerUser(user.id, pageable).map { t ->
                saleViewMapper.map(t)
            }
        }
    }

    fun findByAnnouncementId(announcementId: String, pageable: Pageable): Page<SaleView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            announcementService.findById(announcementId).run {
                if (this.ownerUser.id != user.id) throw Exception("Acesso negado!")
            }
            saleRepository.findByAnnouncementId (announcementId, pageable).map { t ->
                saleViewMapper.map(t)
            }
        }
    }


    //fazer autenticação, verificar o usuario autenticado é o buyUser ou ownUser
   // fun findById(id: String): SaleView {
     //   return AuthenticationUtils.authenticate(userRepository) { user ->

       // }
    //}
// criar as controllers restantes

}



