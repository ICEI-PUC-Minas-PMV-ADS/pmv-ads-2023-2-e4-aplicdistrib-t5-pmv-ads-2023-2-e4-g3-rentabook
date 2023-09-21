package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Image
import org.springframework.data.mongodb.repository.MongoRepository

interface ImageRepository: MongoRepository<Image, String>