package br.puc.projeto.rentabook.models

import org.springframework.data.annotation.Id
import java.time.LocalDateTime

data class User(
    @Id
    val id: String,
    val name: String,
    val userImage: String, // Image
    val email: String,
    val password: String,
    val createData: LocalDateTime,
    val booksId: List<String>,
    val addresses: List<String>, // List<Address>
    val role: List<String>, // List<Role>
)