package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.AnnouncementView
import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.repository.BookRepository
import org.springframework.stereotype.Component

@Component
class AnnouncementViewMapper(
    private val bookRepository: BookRepository,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val imageMapper: ImageViewMapper,
    private val addressViewMapper: AddressViewMapper,
) : Mapper<Announcement, AnnouncementView> {
    override fun map(t: Announcement): AnnouncementView {
        return AnnouncementView(
            id = t.id ?: throw Exception("Id de anuncio invalido!"),
            book = bookRepository.findById(t.bookId),
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            images = t.images.map { imageMapper.map(it) }.toList(),
            description = t.description,
            createdDate = t.createdDate,
            isAvailable = t.isAvailable,
            rent = t.rent,
            sale = t.sale,
            dailyValue = t.dailyValue,
            saleValue = t.saleValue,
            location = addressViewMapper.map(t.location),
        )
    }
}