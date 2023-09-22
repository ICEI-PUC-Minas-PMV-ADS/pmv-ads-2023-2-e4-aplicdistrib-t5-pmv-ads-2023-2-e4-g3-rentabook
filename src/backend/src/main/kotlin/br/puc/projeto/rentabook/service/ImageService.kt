package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.exception.ImageTypeNotSupportedException
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.repository.ImageRepository
import org.apache.tika.Tika
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files


@Service
class ImageService(
    private val imageRepository: ImageRepository
) {
    fun uploadImage(image: MultipartFile): Image {
        return detectedAndValidateType(image).let { imageType ->
            imageRepository.save(Image()).run {
                id as String
                val currentDirectory = System.getProperty("user.dir")
                val uploadDir = File("$currentDirectory/src/backend/src/main/kotlin/br/puc/projeto/rentabook/images/users")
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs()
                }
                val contentTypeToExtension = mapOf(
                    "image/jpeg" to ".jpeg",
                    "image/png" to ".png"
                )
                val extension = contentTypeToExtension[imageType]

                val filePath = File(uploadDir, id + extension)
                image.transferTo(filePath)
                type = imageType
                path = filePath.path
                imageRepository.save(this)
            }
        }

    }

    fun getImage(id: String): Image {
        return imageRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Imagem não encontrada")
        }
    }

    fun deleteImage(id: String){
        imageRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Imagem não encontrada")
            val image = File(this.path ?: throw Exception("Houve um problema ao encontrar o caminho da imagem"))
            image.delete()
            imageRepository.deleteById(id)
        }
    }

    fun detectedAndValidateType(file: MultipartFile): String {
        return Tika().run {
            val detectedType = detect(file.inputStream)

            val allowedTypes = setOf("image/jpeg", "image/png")

            if (detectedType !in allowedTypes) {
                throw ImageTypeNotSupportedException("Tipo de arquivo não suportado: $detectedType")
            }
            detectedType
        }


    }
}