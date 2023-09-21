package br.puc.projeto.rentabook.dto

data class BookView (
    val id: String?,
    val title: String?,
    val authors: List<String?>?,
    val publisher: String?,
    val publishedDate: String?,
    val description: String?,
    val imageLinks: ImageLinksGoogleBooksDTO?,
    val pageCount: Int?
)