package br.puc.projeto.rentabook.security

import br.puc.projeto.rentabook.exception.NotFoundException
import br.puc.projeto.rentabook.model.Role
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.service.UserDetailsService
import br.puc.projeto.rentabook.service.UserService
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.core.Authentication
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.stereotype.Component
import java.lang.IllegalArgumentException
import java.security.Key
import java.util.*
import javax.crypto.spec.SecretKeySpec

@Component
class JWTUtils(
    private val userDetailsService: UserDetailsService,
    private val userRepository: UserRepository
) {
    private val expiration: Long = 2592000000
    private var secretKey: String = "b0f20c40b516be74bcb5bfc29f54887fada89e9100a1a6e6b7118f61d995f53deb4bebcec8af8f790f09da8cb174ea9c1273257be8af1343dac0825494bad488"
    private val key: Key = SecretKeySpec(secretKey.toByteArray(), "HmacSHA512")

    fun generateToken(userName: String, authorities: List<Role>, passwordVersion: Int): String {
        return Jwts.builder()
            .setSubject(userName)
            .claim("role", authorities)
            .claim("passwordVersion", passwordVersion)
            .setExpiration(Date(System.currentTimeMillis() + expiration))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }

    fun isValid(jwt: String?): Boolean {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(secretKey.toByteArray())
                .build().parseClaimsJws(jwt).body
            val user = userRepository.findByEmail(claims.subject) ?: throw NotFoundException("Usuário associado ao token não encontrado")
            val storedPasswordVersion = claims["passwordVersion"] as Int
            storedPasswordVersion == user.passwordVersion
        } catch (e: IllegalArgumentException) {
            false
        }
    }

    fun getAuthentication(jwt: String?): Authentication {
        val username = Jwts.parserBuilder()
            .setSigningKey(secretKey.toByteArray())
            .build().parseClaimsJws(jwt).body.subject
        val user = userDetailsService.loadUserByUsername(username)
        return UsernamePasswordAuthenticationToken(username, null, user.authorities)
    }

}