package br.puc.projeto.rentabook.dto

data class VolumeInfoGoogleBooksDTO (
    val title: String?,
    val authors: List<String?>?,
    val publisher: String?,
    val publishedDate: String?,
    val description: String?,
    val industryIdentifiers: List<IndustryIdentifiersGoogleBooksDTO?>?,
    val pageCount: Int?,
    val dimensions: DimensionsGoogleBooksDTO?,
    val printType: String?,
    val mainCategory: String?,
    val categories: List<String?>?,
    val averageRating: Double?,
    val ratingsCount: Int?,
    val contentVersion: String?,
    val imageLinks: ImageLinksGoogleBooksDTO?,
    val language: String?,
    val infoLink: String?,
    val canonicalVolumeLink: String?
)