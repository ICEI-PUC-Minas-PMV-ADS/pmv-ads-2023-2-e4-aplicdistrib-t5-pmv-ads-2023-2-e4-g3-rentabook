package br.puc.projeto.rentabook.repositories

import br.puc.projeto.rentabook.models.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String> {
    fun findByEmail(email: String): User?
}