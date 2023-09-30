package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.dto.RentView
import br.puc.projeto.rentabook.model.Rent
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface RentRepository : MongoRepository<Rent, String> {}