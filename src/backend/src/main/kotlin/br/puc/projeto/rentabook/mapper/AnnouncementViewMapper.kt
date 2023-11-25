package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.AnnouncementView
import br.puc.projeto.rentabook.model.Announcement
import org.springframework.stereotype.Component

@Component
class AnnouncementViewMapper(
    private val publicUserViewMapper: PublicUserViewMapper,
    private val imageMapper: ImageViewMapper,
    private val privateAddressViewMapper: PrivateAddressViewMapper,
) : Mapper<Announcement, AnnouncementView> {
    override fun map(t: Announcement): AnnouncementView {
        return AnnouncementView(
            id = t.id ?: throw Exception("Id de anuncio invalido!"),
            book = t.book,
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            images = t.images.map { imageMapper.map(it) }.toList(),
            description = t.description,
            createdDate = t.createdDate,
            isAvailable = t.isAvailable,
            rent = t.rent,
            sale = t.sale,
            trade = t.trade,
            valueForSale = t.valueForSale,
            valueForRent = t.valueForRent,
            location = privateAddressViewMapper.map(t.location),
            status = t.status,
            wasReturn = t.wasReturn,
        )
    }
}