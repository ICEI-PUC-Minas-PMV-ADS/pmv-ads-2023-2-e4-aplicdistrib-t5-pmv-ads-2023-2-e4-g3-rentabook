package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Role
import org.springframework.data.mongodb.repository.MongoRepository

interface RoleRepository: MongoRepository<Role, String> {
    fun findByName(name: String): Role?
}