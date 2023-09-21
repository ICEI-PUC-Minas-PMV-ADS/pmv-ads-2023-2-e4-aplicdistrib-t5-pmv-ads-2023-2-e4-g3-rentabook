package br.puc.projeto.rentabook.dto

data class SaleInfoGoogleBooksDTO (
    val country: String?,
    val saleability: String?,
    val isEbook: Boolean?,
    val listPrice: PriceGoogleBooksDTO?,
    val retailPrice: PriceGoogleBooksDTO?,
    val buyLink: String?
)