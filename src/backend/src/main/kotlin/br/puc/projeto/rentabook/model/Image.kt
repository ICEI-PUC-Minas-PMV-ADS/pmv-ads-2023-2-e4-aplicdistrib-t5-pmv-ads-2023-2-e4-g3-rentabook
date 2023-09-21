package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("images")
data class Image(
    @Id
    val id: String? = null,
    var path: String? = null,
)