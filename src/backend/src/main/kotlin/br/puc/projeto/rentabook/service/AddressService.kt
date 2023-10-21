package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.AddressForm
import br.puc.projeto.rentabook.dto.PrivateAddressView
import br.puc.projeto.rentabook.dto.PublicAddressView
import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.mapper.AddressFormMapper
import br.puc.projeto.rentabook.mapper.PrivateAddressViewMapper
import br.puc.projeto.rentabook.mapper.PublicAddressViewMapper
import br.puc.projeto.rentabook.model.Address
import br.puc.projeto.rentabook.repository.AddressRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class AddressService(
    private val addressRepository: AddressRepository,
    private val addressFormMapper: AddressFormMapper,
    private val userRepository: UserRepository,
    private val privateAddressViewMapper: PrivateAddressViewMapper,
    private val userService: UserService,
    private val publicAddressViewMapper: PublicAddressViewMapper
) {
    fun getPrivateAddress(id: String): PrivateAddressView {
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val findedAddress = user.addresses.find { address ->
                address.id == id
            }
            if (findedAddress != null) {
                 privateAddressViewMapper.map(findedAddress)
            } else throw NotFoundException("Endereço não encontrado!")
        }
    }

    fun getPublicAddress(id: String): PublicAddressView{
        return addressRepository.findByIdOrNull(id).run {
            this ?: throw NotFoundException("Endereço não encontrado!")
            publicAddressViewMapper.map(this)
        }
    }

    fun saveAddress(form: AddressForm): PrivateAddressView {
        return AuthenticationUtils.authenticate(userRepository) {
            addressRepository.save(addressFormMapper.map(form)).let { address ->
                userService.saveAddress(address)
                privateAddressViewMapper.map(address)
            }
        }
    }

    fun deleteAddress(id: String){
        return AuthenticationUtils.authenticate(userRepository) { user ->
            val findedAddress = user.addresses.find { address ->
                address.id == id
            }
            if (findedAddress != null) {
                addressRepository.deleteById(id)
                userService.deleteAddress(id)
            } else throw NotFoundException("Endereço não encontrado!")
        }
    }
}