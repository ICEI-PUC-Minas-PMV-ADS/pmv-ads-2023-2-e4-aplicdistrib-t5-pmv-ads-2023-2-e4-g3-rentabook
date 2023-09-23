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
    var name: String,
    var userImage: Image? = null,
    val email: String,
    var password: String,
    val createData: LocalDateTime = LocalDateTime.now(),
    val booksId: MutableList<String?> = mutableListOf(),
    val addresses: MutableList<Address?> = mutableListOf(),
    val role: List<Role>
)