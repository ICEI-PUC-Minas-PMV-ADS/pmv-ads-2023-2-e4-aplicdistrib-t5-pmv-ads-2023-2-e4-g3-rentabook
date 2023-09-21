package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.model.Role
import br.puc.projeto.rentabook.repository.RoleRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class RoleService (private val roleRepository: RoleRepository) {

    fun getCommonUserRole(): Role{
        roleRepository.findByName("readWrite").run {
            return this ?: roleRepository.save(Role(name = "readWrite"))
        }
    }

    fun getAdminRole(): Role{
        roleRepository.findByName("admin").run {
            return this ?: roleRepository.save(Role(name = "admin"))
        }
    }
}