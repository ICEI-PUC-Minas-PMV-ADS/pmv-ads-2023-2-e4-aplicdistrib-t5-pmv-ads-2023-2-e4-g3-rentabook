package br.puc.projeto.rentabook.dto

data class SearchVolumeGoogleBooksDTO (
    val kind: String?,
    val items: List<EspecificVolumeGoogleBooksDTO?>,
    val totalItems: Int?
)