package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.repository.ImageRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import javax.imageio.ImageIO

@Service
class ImageService(
    private val imageRepository: ImageRepository
) {
    fun uploadImage(image: MultipartFile): Image {
        return imageRepository.save(Image()).run {
            id as String
            val currentDirectory = System.getProperty("user.dir")
            val uploadDir = File("$currentDirectory/src/backend/src/main/kotlin/br/puc/projeto/rentabook/images/users")
            if (!uploadDir.exists()) {
                uploadDir.mkdirs()
            }
            val filePath = File(uploadDir, id + image.originalFilename as String)
            image.transferTo(filePath)
            path = filePath.path
            imageRepository.save(this)
        }
    }
}