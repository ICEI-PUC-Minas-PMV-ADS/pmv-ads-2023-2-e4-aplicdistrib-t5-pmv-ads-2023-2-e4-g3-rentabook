package br.puc.projeto.rentabook.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.*

@Document("users")
data class User(
    @Id
    val id: String? = null,
    val name: String,
    val userImage: Image? = null,

    @Indexed(unique = true)
    val email: String,

    val password: String,
    val createData: Date,
    val booksId: List<String> = listOf(),
    val addresses: List<String> = listOf(), // List<Address>
    val role: List<String> = listOf(), // List<Role>
)