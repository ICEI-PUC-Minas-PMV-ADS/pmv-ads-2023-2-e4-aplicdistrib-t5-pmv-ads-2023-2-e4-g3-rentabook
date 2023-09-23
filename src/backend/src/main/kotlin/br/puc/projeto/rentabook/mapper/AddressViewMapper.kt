package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.AddressView
import br.puc.projeto.rentabook.model.Address
import org.springframework.stereotype.Component

@Component
class AddressViewMapper : Mapper<Address, AddressView> {
    override fun map(t: Address): AddressView {
        return AddressView(
            id = t.id ?: throw Exception("Id do endereço invalido!"),
            name = t.name,
            cep = t.cep,
            street = t.street,
            number = t.number,
            complement = t.complement,
            neighborhood = t.neighborhood,
            city = t.city,
            state = t.state,
        )
    }
}