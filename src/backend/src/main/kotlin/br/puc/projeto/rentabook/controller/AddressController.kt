package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.service.AddressService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
class AddressController (private val addressService: AddressService) {
    @GetMapping("/public/address/{id}")
    fun getPublicAddress(@PathVariable id: String): PublicAddressView{
        return addressService.getPublicAddress(id)
    }


    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/address/{id}")
    fun getPrivateAddress(@PathVariable id: String): PrivateAddressView{
        return addressService.getPrivateAddress(id)
    }


    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/address")
    fun registerAddress(@RequestBody @Valid form: AddressForm): PrivateAddressView {
        return addressService.saveAddress(form)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @DeleteMapping("/address/{id}")
    fun deleteAddress(@PathVariable id: String) {
        return addressService.deleteAddress(id)
    }
}