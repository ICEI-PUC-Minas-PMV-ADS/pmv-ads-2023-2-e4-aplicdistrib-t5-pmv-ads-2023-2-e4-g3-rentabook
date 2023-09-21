package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.PublicUserView
import br.puc.projeto.rentabook.model.User
import org.springframework.stereotype.Component

@Component
class PublicUserViewMapper: Mapper<User, PublicUserView> {
    override fun map(t: User): PublicUserView {
        return PublicUserView(
            id = t.id,
            name = t.name,
            userImage = t.userImage?.id,
            booksId = t.booksId
        )
    }
}