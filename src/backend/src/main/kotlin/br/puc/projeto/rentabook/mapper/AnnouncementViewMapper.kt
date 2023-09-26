package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.AnnouncementView
import br.puc.projeto.rentabook.model.Announcement
import org.springframework.stereotype.Component

@Component
class AnnouncementViewMapper : Mapper <Announcement, AnnouncementView> {
    override fun map(t: Announcement): AnnouncementView {
       return AnnouncementView(
               id = t.id,
               book = t.bookId,
               ownerUser = t.ownerUser.id,
               images = t.images.map { image -> image.id  },
               description = t.description,
               createdDate = t.createdDate,
               isAvailable = t.isAvailable,
               rent = t.rent,
               sale = t.sale,
               dailyValue = t.dailyValue,
               saleValue = t.saleValue,
               location = t.location.id
               )
    }

}