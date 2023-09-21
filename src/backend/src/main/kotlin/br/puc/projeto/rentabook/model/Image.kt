package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id

data class Image(
    @Id
    val id: String,
    val path: String,
)