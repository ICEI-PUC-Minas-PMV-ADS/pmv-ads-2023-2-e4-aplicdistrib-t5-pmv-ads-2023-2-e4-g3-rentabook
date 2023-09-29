package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.RentForm
import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.RentFormMapper
import br.puc.projeto.rentabook.mapper.RentViewMapper
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.lang.IllegalStateException

@Service
class RentService(
    private val rentRepository: RentRepository,
    private val rentViewMapper: RentViewMapper,
    private val rentFormMapper: RentFormMapper,
    private val userRepository: UserRepository,
    private val announcementRepository: AnnouncementRepository,
) {

    fun create(form: RentForm): RentView {
        return AuthenticationUtils.authenticate(userRepository) {
            rentRepository.save(rentFormMapper.map(form)).run {
                announcement.isAvailable = false
                announcementRepository.save(announcement)
                rentViewMapper.map(this)
            }
        }
    }

    fun get(id: String): RentView? {
        return AuthenticationUtils.authenticate(userRepository) { _ ->
            val rent = rentRepository.findById(id)
            if (rent.isPresent) {
                rentViewMapper.map(rent.get())
            } else {
                null
            }
        }
    }

    fun getAll(pageable: Pageable): Page<RentView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            rentRepository.findAll(pageable)
                .map { rentViewMapper.map(it) }
        }
    }

    fun cancel(id: String): RentView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val rent = rentRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (rent.ownerUser.id != user.id && rent.lead.id == user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (!rent.cancelled) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }
            rent.announcement.isAvailable = true
            announcementRepository.save(rent.announcement)
            rent.cancelled = true
            rentViewMapper.map(rentRepository.save(rent))
        }
    }

    fun complete(id: String): RentView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val rent = rentRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (rent.ownerUser.id != user.id && rent.lead.id == user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (!rent.cancelled) {
                throw IllegalStateException("Esta venda não foi cancelada e não pode ser desfeita")
            }
            rent.announcement.isAvailable = true
            announcementRepository.save(rent.announcement)
            rent.accepted = true
            rentViewMapper.map(rentRepository.save(rent))
        }
    }
}



