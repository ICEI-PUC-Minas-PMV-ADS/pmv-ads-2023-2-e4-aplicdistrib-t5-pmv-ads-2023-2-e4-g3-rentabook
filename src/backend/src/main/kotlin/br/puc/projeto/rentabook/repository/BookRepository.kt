package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.dto.EspecificVolumeGoogleBooksDTO
import br.puc.projeto.rentabook.dto.SearchVolumeGoogleBooksDTO
import br.puc.projeto.rentabook.exception.NotFoundException
import org.springframework.stereotype.Repository
import org.springframework.web.reactive.function.client.WebClient

@Repository
class BookRepository {
    private val token = "AIzaSyBO8UaLfjQtkwUbEx-HyytgoFzErmx9fV4"
    private val message = "Houve um erro ao comunicar com o GoogleBooks"

    fun findById(id: String): EspecificVolumeGoogleBooksDTO {
        val url = "https://www.googleapis.com"
        val uri = "/books/v1/volumes/$id?key=$token"

        return WebClient
            .create(url)
            .get()
            .uri(uri)
            .retrieve()
            .bodyToMono(EspecificVolumeGoogleBooksDTO::class.java)
            .block().run {
                this ?: throw NotFoundException(message)
            }
    }

    fun findAll(search: String): SearchVolumeGoogleBooksDTO {
        val url = "https://www.googleapis.com"
        val uri = "/books/v1/volumes?q=$search&key=$token"

        return WebClient
            .create(url)
            .get()
            .uri(uri)
            .retrieve()
            .bodyToMono(SearchVolumeGoogleBooksDTO::class.java)
            .block().run {
                this ?: throw NotFoundException(message)
            }
    }

}