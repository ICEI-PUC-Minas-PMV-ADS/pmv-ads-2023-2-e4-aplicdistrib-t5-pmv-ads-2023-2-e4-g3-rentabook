package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Address
import org.springframework.data.mongodb.repository.MongoRepository

interface AddressRepository: MongoRepository<Address, String> {
}