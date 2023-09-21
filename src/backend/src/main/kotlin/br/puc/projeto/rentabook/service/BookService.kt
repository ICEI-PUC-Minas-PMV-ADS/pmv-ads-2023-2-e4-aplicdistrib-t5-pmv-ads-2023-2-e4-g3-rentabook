package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.BookView
import br.puc.projeto.rentabook.dto.SearchVolumeGoogleBooksDTO
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.BookViewMapper
import br.puc.projeto.rentabook.repository.BookRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import kotlin.math.E

@Service
class BookService (
    private val bookRepository: BookRepository,
    private val bookViewMapper: BookViewMapper
){
    fun findById (id: String): BookView {
        return bookRepository.findById(id).run {
            bookViewMapper.map(this)
        }
    }

    fun findAll (search: String, pageable: Pageable): Page<BookView>{
        return bookRepository.findAll(search).run {
            this.items.map {t ->
                t ?: throw NotFoundException("Nenhum livro encontrado")
                bookViewMapper.map(t)
            }.run {
                getCustomPage(this, pageable = pageable)
            }
        }
    }

    fun getCustomPage(bookList: List<BookView>, pageable: Pageable): Page<BookView> {
        val startIndex = pageable.pageNumber * pageable.pageSize
        val endIndex = (startIndex + pageable.pageSize).coerceAtMost(bookList.size)

        val pageList = bookList.subList(startIndex, endIndex)

        return PageImpl(pageList, pageable, bookList.size.toLong())
    }
}