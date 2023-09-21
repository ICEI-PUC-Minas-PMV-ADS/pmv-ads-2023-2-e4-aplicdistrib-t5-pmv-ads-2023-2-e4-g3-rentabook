package br.puc.projeto.rentabook.dto

data class AccessInfoGoogleBooksDTO (
    val country: String?,
    val viewability: String?,
    val embeddable: Boolean?,
    val publicDomain: Boolean?,
    val textToSpeechPermission: String?,
    val epub: EpubGoogleBooksDTO?,
    val pdf: PdfGoogleBooksDTO?,
    val accessViewStatus: String?
)