package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.repository.ImageRepository
import jakarta.servlet.http.HttpServletResponse
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.nio.file.Files

@RestController
class ImageController(
    private val imageRepository: ImageRepository
) {

    @GetMapping("/image/{id}")
    fun getImagem (@PathVariable id: String, response: HttpServletResponse): ResponseEntity<ByteArray> {
        return imageRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Imagem não encontrada")
            val imagem = File(path)
            val imagemBytes = Files.readAllBytes(imagem.toPath())

            response.contentType = MediaType.IMAGE_PNG_VALUE
            val output = response.outputStream
            output.write(imagemBytes)
            output.close()

            ResponseEntity.ok().build()
        }

    }
}