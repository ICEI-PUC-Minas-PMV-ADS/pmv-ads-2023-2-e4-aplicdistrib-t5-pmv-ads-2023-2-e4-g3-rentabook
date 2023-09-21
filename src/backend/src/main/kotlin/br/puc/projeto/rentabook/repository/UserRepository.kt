package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository: MongoRepository<User, String> {
    fun findByEmail(email: String?): User?
}