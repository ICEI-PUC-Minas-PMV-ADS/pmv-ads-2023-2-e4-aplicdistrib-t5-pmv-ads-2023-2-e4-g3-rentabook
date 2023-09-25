package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.BookView
import br.puc.projeto.rentabook.dto.EspecificVolumeGoogleBooksDTO
import br.puc.projeto.rentabook.dto.SearchVolumeGoogleBooksDTO
import br.puc.projeto.rentabook.service.BookService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/books")
class BookController(
    private val bookService: BookService
) {
    @GetMapping("/id/{bookId}")
    fun findById(@PathVariable bookId: String): BookView {
        return bookService.findById(bookId)
    }


    @GetMapping("/find")
    fun findAll(@RequestParam search: String,
                @PageableDefault(
                    size = 5
                )pageable: Pageable): Page<BookView> {
        return bookService.findAll(search, pageable)
    }

    @GetMapping("/availableToNegotiate")
    fun getBooksAvailableToNegotiate(
        @PageableDefault(size = 5) pageable: Pageable
    ): Page<BookView> {
        return bookService.findAllBooksAvailableToNegotiate(pageable)
    }
}