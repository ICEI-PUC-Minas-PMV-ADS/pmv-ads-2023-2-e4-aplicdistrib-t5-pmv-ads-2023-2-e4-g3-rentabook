package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.AddressForm
import br.puc.projeto.rentabook.model.Address
import org.springframework.stereotype.Component

@Component
class AddressFormMapper : Mapper<AddressForm, Address> {
    override fun map(t: AddressForm): Address {
        return Address(
            cep = t.cep,
            name = t.name,
            street = t.street,
            number = t.number,
            complement = t.complement,
            neighborhood = t.neighborhood,
            city = t.city,
            state = t.state
        )
    }
}