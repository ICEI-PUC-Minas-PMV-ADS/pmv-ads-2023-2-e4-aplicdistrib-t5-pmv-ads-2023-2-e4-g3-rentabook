package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.RentForm
import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.RentFormMapper
import br.puc.projeto.rentabook.mapper.RentViewMapper
import br.puc.projeto.rentabook.model.Rent
import br.puc.projeto.rentabook.repository.AnnouncementRepository
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.stereotype.Service
import java.lang.Exception
import java.lang.IllegalStateException

@Service
class RentService(
    private val mongoTemplate: MongoTemplate,
    private val rentRepository: RentRepository,
    private val rentViewMapper: RentViewMapper,
    private val rentFormMapper: RentFormMapper,
    private val userRepository: UserRepository,
    private val announcementRepository: AnnouncementRepository,
) {

    fun create(form: RentForm): RentView {
        return AuthenticationUtils.authenticate(userRepository) {
            rentRepository.save(rentFormMapper.map(form)).run {
                if (announcement.ownerUser.id == it.id) {
                    throw Exception("O proprietario do livro não pode aluga-lo")
                }
                if (!announcement.rent || !announcement.isAvailable) {
                    throw Exception("Este livro não esta disponivel para aluguel")
                }
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
        return AuthenticationUtils.authenticate(userRepository) {
            rentRepository.findAll(pageable)
                .map { rentViewMapper.map(it) }
        }
    }

    fun getAllOwnRents(pageable: Pageable): Page<RentView> {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val query = Query()
                .with(pageable)
                .addCriteria(Criteria("accepted").isEqualTo(false))
                .addCriteria(Criteria("cancelled").isEqualTo(false))
                .addCriteria(Criteria("lead.id").isEqualTo(user.id ?: throw Exception("Id do usuário invalido")))

            val rents = mongoTemplate.find(query, Rent::class.java)
                .map { rentViewMapper.map(it) }

            PageImpl(rents, pageable, rents.size.toLong())
        }
    }

    fun cancel(id: String): RentView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val rent = rentRepository.findById(id)
                .orElseThrow { NotFoundException("Venda não encontrada") }
            if (rent.ownerUser.id != user.id && rent.lead.id != user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (rent.cancelled && rent.accepted) {
                throw IllegalStateException("Este aluguel não foi cancelada e não pode ser desfeita")
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
            if (rent.ownerUser.id != user.id) {
                throw IllegalStateException("Você não tem autorização para fazer essa operação.")
            }
            if (rent.cancelled && rent.accepted) {
                throw IllegalStateException("Esta aluguel não foi cancelada e não pode ser desfeita")
            }
            rent.announcement.isAvailable = true
            announcementRepository.save(rent.announcement)
            rent.accepted = true
            rentViewMapper.map(rentRepository.save(rent))
        }
    }
}



