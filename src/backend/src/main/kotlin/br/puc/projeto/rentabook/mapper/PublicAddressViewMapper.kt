package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.PrivateAddressView
import br.puc.projeto.rentabook.dto.PublicAddressView
import br.puc.projeto.rentabook.model.Address
import org.springframework.stereotype.Component

@Component
class PublicAddressViewMapper : Mapper<Address, PublicAddressView> {
    override fun map(t: Address): PublicAddressView {
        return PublicAddressView(
            id = t.id ?: throw Exception("Id do endereço invalido!"),
            cep = t.cep,
            street = t.street,
            neighborhood = t.neighborhood,
            city = t.city,
            state = t.state,
        )
    }
}