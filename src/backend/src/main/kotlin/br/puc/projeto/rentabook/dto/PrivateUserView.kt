package br.puc.projeto.rentabook.dto

import br.puc.projeto.rentabook.model.Address
import br.puc.projeto.rentabook.model.Image

data class PrivateUserView (
    val id: String? = null,
    val name: String,
    var userImage: String?,
    val email: String,
    val booksId: List<String?>,
    val addresses: List<PrivateAddressView>,
)