package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.dto.SaleForm
import br.puc.projeto.rentabook.dto.SaleView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.RentViewMapper
import br.puc.projeto.rentabook.mapper.SaleFormMapper
import br.puc.projeto.rentabook.mapper.SaleViewMapper
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.model.User
import br.puc.projeto.rentabook.repository.RentRepository
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
class RentService(private val rentRepository: RentRepository, private val rentViewMapper: RentViewMapper, private val userRepository: UserRepository, private val announcementService: AnnouncementService) {


    @Transactional
    fun cancel(id: String): RentView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val rent = rentRepository.findById(id)
                    .orElseThrow { NotFoundException("Venda não encontrada") }

            if (!rent.cancelled) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }


            rent.cancelled = true
           rentViewMapper.map(rentRepository.save(rent))
        }
    }




}



