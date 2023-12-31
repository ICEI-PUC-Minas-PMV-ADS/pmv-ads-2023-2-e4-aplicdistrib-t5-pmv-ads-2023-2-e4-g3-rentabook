package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.CleanAnnouncementView
import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.repository.RatingRepository
import br.puc.projeto.rentabook.service.BookService
import org.springframework.stereotype.Component

@Component
class CleanAnnouncementViewMapper(
    private val bookService: BookService,
    private val publicUserViewMapper: PublicUserViewMapper,
    private val publicAddressViewMapper: PublicAddressViewMapper,
    private val ratingRepository: RatingRepository,
    private val bookViewMapper: BookViewMapper,
) : Mapper<Announcement, CleanAnnouncementView> {
    override fun map(t: Announcement): CleanAnnouncementView {
        val ratings = ratingRepository.findByAnnouncementId(t.id!!)
        var totalStars: Int = 0
        ratings.forEach { r ->
            totalStars += r.stars
        }
        val averageStars = if (ratings.isNotEmpty()) {
            totalStars / ratings.size
        } else 0

        return CleanAnnouncementView(
            id = t.id,
            book = bookViewMapper.map(t.book),
            createdDate = t.createdDate,
            description = t.description,
            images = t.images.map { i -> i.id },
            isAvailable = t.isAvailable,
            location = publicAddressViewMapper.map(t.location),
            ownerUser = publicUserViewMapper.map(t.ownerUser),
            rent = t.rent,
            sale = t.sale,
            trade = t.trade,
            valueForSale = t.valueForSale,
            valueForRent = t.valueForRent,
            averageStars = averageStars,
            totalRatings = ratings.size,
            status = t.status,
            wasReturn = t.wasReturn,
        )
    }

}