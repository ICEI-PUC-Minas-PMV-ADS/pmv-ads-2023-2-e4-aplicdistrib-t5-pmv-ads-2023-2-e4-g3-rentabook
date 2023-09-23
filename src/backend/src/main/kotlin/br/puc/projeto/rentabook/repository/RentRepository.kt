package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Rent
import org.springframework.data.mongodb.repository.MongoRepository

interface RentRepository : MongoRepository<Rent, String> {}