package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.AddressForm
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.AddressFormMapper
import br.puc.projeto.rentabook.model.Address
import br.puc.projeto.rentabook.repository.AddressRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class AddressService(
    private val addressRepository: AddressRepository,
    private val addressFormMapper: AddressFormMapper
) {
    fun getAddress(id: String): Address {
        return addressRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Endereço não encontrado")
        }
    }

    fun saveAddress(address: AddressForm): Address {
        return addressFormMapper.map(address).run {
            addressRepository.save(this)
        }
    }

    fun deleteAddress(id: String){
        addressRepository.deleteById(id)
    }
}