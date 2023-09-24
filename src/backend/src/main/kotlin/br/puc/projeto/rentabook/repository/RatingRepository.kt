package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Rating
import org.springframework.data.mongodb.repository.MongoRepository

interface RatingRepository : MongoRepository<Rating, String> {}