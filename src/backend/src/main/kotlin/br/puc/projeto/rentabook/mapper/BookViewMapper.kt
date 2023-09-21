package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.BookView
import br.puc.projeto.rentabook.dto.EspecificVolumeGoogleBooksDTO
import org.springframework.stereotype.Component

@Component
class BookViewMapper : Mapper<EspecificVolumeGoogleBooksDTO, BookView> {
    override fun map(t: EspecificVolumeGoogleBooksDTO): BookView {
        return BookView(
            id = t.id,
            title = t.volumeInfo?.title,
            authors = t.volumeInfo?.authors,
            publisher = t.volumeInfo?.publisher,
            publishedDate = t.volumeInfo?.publishedDate,
            description = t.volumeInfo?.description,
            imageLinks = t.volumeInfo?.imageLinks,
            pageCount = t.volumeInfo?.pageCount
        )
    }

}