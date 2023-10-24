package br.puc.projeto.rentabook.mapper


import br.puc.projeto.rentabook.dto.PrivateUserView
import br.puc.projeto.rentabook.model.User
import org.springframework.stereotype.Component

@Component
class PrivateUserViewMapper(
    private val privateAddressViewMapper: PrivateAddressViewMapper
): Mapper<User, PrivateUserView> {
    override fun map(t: User): PrivateUserView{
        return PrivateUserView(
            id = t.id,
            name = t.name,
            userImage = t.userImage?.id,
            email = t.email,
            booksId = t.booksId,
            addresses = t.addresses.map { address ->
                privateAddressViewMapper.map(address)
            }
        )
    }
}