package br.puc.projeto.rentabook.dto

data class EspecificVolumeGoogleBooksDTO(
    val kind: String?,
    val id: String?,
    val etag: String?,
    val selfLink: String?,
    val volumeInfo: VolumeInfoGoogleBooksDTO?,
    val saleInfo: SaleInfoGoogleBooksDTO?,
    val accessInfo: AccessInfoGoogleBooksDTO?
)