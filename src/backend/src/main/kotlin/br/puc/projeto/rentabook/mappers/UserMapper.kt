package br.puc.projeto.rentabook.mappers

import br.puc.projeto.rentabook.models.User
import br.puc.projeto.rentabook.views.UserView

class UserMapper {
    fun toUserView(user: User): UserView {
        return UserView(
            id = user.id ?: "",
            name = user.name,
            userImage = user.userImage,
            email = user.email,
            createData = user.createData,
            addresses = user.addresses,
        )
    }
}