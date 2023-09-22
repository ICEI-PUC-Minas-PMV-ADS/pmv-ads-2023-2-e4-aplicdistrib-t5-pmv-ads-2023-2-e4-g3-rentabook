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
    var userImage: Image?,
    val email: String,
    val password: String,
    val createData: LocalDateTime = LocalDateTime.now(),
    val booksId: List<String?>?,
    val addresses: List<Address?>?,
    val role: List<Role>
)