package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.service.ImageService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.nio.file.Files

@RestController
class ImageController(
    private val imageService: ImageService
) {
    @GetMapping("/public/image/{id}")
    fun getImagem(@PathVariable id: String, response: HttpServletResponse): ResponseEntity<ByteArray> {
        return imageService.getImage(id).run {
            if (this == null) {
                val currentDirectory = System.getProperty("user.dir")
                val image = File("$currentDirectory/src/main/kotlin/br/puc/projeto/rentabook/images/defaultImages/notFoundImage.jpg")
                val imageBytes = Files.readAllBytes(image.toPath())
                response.contentType = "image/jpeg"
                val output = response.outputStream
                output.write(imageBytes)
                output.close()
                ResponseEntity.ok().build()
            } else {
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
}