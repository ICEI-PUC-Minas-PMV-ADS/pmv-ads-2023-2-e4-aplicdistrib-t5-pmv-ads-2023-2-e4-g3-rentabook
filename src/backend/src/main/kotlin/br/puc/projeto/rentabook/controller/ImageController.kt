package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.repository.ImageRepository
import br.puc.projeto.rentabook.service.ImageService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.servlet.http.HttpServletResponse
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.nio.file.Files

@RestController
class ImageController(
    private val imageService: ImageService
) {
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/image/{id}")
    fun getImagem (@PathVariable id: String, response: HttpServletResponse): ResponseEntity<ByteArray> {
        return imageService.getImage(id).run {
            val image = File(this.path ?: throw Exception("Houve um problema ao encontrar o caminho da imagem"))
            val imageBytes = Files.readAllBytes(image.toPath())
            response.contentType = type
            val output = response.outputStream
            output.write(imageBytes)
            output.close()
            ResponseEntity.ok().build()
        }
    }
}