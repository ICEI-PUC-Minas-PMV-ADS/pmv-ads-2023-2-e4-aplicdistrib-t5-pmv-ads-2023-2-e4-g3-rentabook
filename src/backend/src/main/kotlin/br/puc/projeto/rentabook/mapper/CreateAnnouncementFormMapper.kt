package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.CreateAnnouncementForm
import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Image
import br.puc.projeto.rentabook.repository.AddressRepository
import br.puc.projeto.rentabook.repository.ImageRepository
import br.puc.projeto.rentabook.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class CreateAnnouncementFormMapper(
    private val userRepository: UserRepository,
    private val imageRepository: ImageRepository,
    private val addressRepository: AddressRepository,
) : Mapper<CreateAnnouncementForm, Announcement> {
    override fun map(t: CreateAnnouncementForm): Announcement {
        val authentication = SecurityContextHolder.getContext().authentication
        if(t.rent == null && t.trade == null && t.sale ==null) t.rent = true
        return Announcement(
            bookId = t.bookId,
            ownerUser = userRepository.findByEmail(authentication.name) ?: throw Exception("Owner user não encontrado!"),
            images = t.images.map { imageIdToImage(it) }.toMutableList(),
            description = t.description,
            location = addressRepository.findById(t.locationId).orElseThrow { throw Exception("Endereço não encontrado!") },
            value = t.value,
            rent = t.rent ?: false,
            sale = t.sale ?: false,
            trade = t.trade ?: false,
        )
    }

    private fun imageIdToImage(imageId: String): Image {
        return imageRepository.findById(imageId).orElseThrow { throw Exception("Imagem não encontrada!") }
    }
}