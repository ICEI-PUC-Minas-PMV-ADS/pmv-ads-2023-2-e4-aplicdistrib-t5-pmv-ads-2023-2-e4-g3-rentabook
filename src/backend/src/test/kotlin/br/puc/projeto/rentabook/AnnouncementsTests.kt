package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.utils.TestUtils
import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.Gson
import org.json.JSONObject
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.nio.charset.StandardCharsets


@ExtendWith(SpringExtension::class)
@AutoConfigureMockMvc
@SpringBootTest(properties = ["spring.data.mongodb.database=rentabook_db_test"])
class AnnouncementsTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate
    
    @Autowired
    private lateinit var gson: Gson

    @BeforeEach
    fun initializeDatabase() {
        val books = listOf(
            "B9KTjwEACAAJ",
            "f1u-swEACAAJ",
            "QkW8EAAAQBAJ"
        )

        TestUtils.createUser(
            mockMvc = mockMvc,
            name = "John",
            email = "john@email.com",
            password = "123456",
            onCreate = {
                userOneToken = it.getString("token")
            }
        )

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/user/address")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        AddressForm(
                            name = "Casa",
                            cep = "01001-000",
                            street = "Praça da Sé",
                            number = "10",
                            complement = "casa",
                            neighborhood = "Sé",
                            city = "São Paulo",
                            state = "SP",
                        )
                    )
                )
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                addressId = response.getString("id")
            }

        // Busca as informações do usuário.
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/user")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                userOneId = response.getString("id")
            }

        // Os livros a lista do usuario.
        books.forEach { bookId ->
            mockMvc.perform(
                MockMvcRequestBuilders
                    .post("/user/books/$bookId")
                    .contentType("application/json")
                    .header("Authorization", "Bearer $userOneToken")
                )
                .andExpect(status().isOk)
        }
    }

    @BeforeEach
    fun clearDocument() {
        mongoTemplate.db.drop()
    }

    /**
     *
     * Teste:       T-010
     * Requisito:   RF-016
     * Objetivo:    Tentar disponibilizar para negociar um dos livros disponiveis para negociação.
     */

    @Test
    fun `T010 - Disponibilizar um livro para negociar`() {
        val bookIdToNegotiate = "B9KTjwEACAAJ"

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = bookIdToNegotiate,
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                Assertions.assertEquals(bookIdToNegotiate, announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }
    }

    /**
     * Teste:       T-011
     * Requisito:   RF-009
     * Objetivo:    Tentar buscar a lista de livros disponiveis para negociação.
     */

    @Test
    fun `T011 - Buscar a lista de livros disponiveis para negociacao`() {
        val books = listOf(
            "f1u-swEACAAJ",
            "QkW8EAAAQBAJ"
        )

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "f1u-swEACAAJ",
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                Assertions.assertEquals("f1u-swEACAAJ", announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "QkW8EAAAQBAJ",
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                Assertions.assertEquals("QkW8EAAAQBAJ", announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }


        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/announcements/available")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val booksAvailableToNegotiate = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<AnnouncementView>::class.java,
                )

                Assertions.assertEquals(2, booksAvailableToNegotiate.size)

                Assertions.assertEquals(books[0], booksAvailableToNegotiate[0].book.id)
                Assertions.assertEquals(books[1], booksAvailableToNegotiate[1].book.id)
            }
    }

    /**
     * Teste:       T-012
     * Requisito:   RF-009
     * Objetivo:    Tentar buscar a lista de livros disponiveis para negociação, com 1 livro alugado.
     */

    @Test
    fun `T012 - Buscar a lista de livros disponiveis para negociacao, sendo que um dos livros foi alugado`() {
        var userRentId = ""
        var userRentToken = ""
        var announcementId = ""
        val books = listOf(
            "f1u-swEACAAJ",
            "QkW8EAAAQBAJ"
        )

        // Cria o usuario que ira alugar o livro
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/register")
                .contentType("application/json")
                .content(
                    ObjectMapper().writeValueAsString(
                        UserForm(
                            name = "Mary",
                            email = "mary@email.com",
                            password = "123456",
                        )
                    )
                )
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                userRentToken = response.getString("token")
            }

        // Busca as informações do usuário que ira alugar o livro.
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/user")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                userRentId = response.getString("id")
            }

        // Cria um anuncio.
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "f1u-swEACAAJ",
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                announcementId = announcementView.id

                Assertions.assertEquals("f1u-swEACAAJ", announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }

        // Cria um anuncio.
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "QkW8EAAAQBAJ",
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                Assertions.assertEquals("QkW8EAAAQBAJ", announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }

        // Aluga um livro.
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/rent")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateRentForm(
                            announcementId = announcementId,
                            startDate = "2023-09-23",
                            endDate = "2023-09-26",
                            value = 15.0,
                        )
                    )
                )
            )
            .andExpect(status().isOk)

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/announcements/available")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val booksAvailableToNegotiate = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<AnnouncementView>::class.java,
                )

                Assertions.assertEquals(1, booksAvailableToNegotiate.size)
                Assertions.assertEquals(books[1], booksAvailableToNegotiate[0].book.id)
            }
    }

    /**
     * Teste:       T-014
     * Requisito:   RF-009
     * Objetivo:    Tentar buscar a lista de livros disponiveis para negociação, com 1 livro alugado.
     */

    @Test
    fun `T014 - Faz a devolucao de um livro alugado`() {
        var userRentToken = ""
        var announcementId = ""
        var rentView: RentView? = null

        // Cria o usuario que ira alugar o livro
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/register")
                .contentType("application/json")
                .content(
                    ObjectMapper().writeValueAsString(
                        UserForm(
                            name = "Mary",
                            email = "mary@email.com",
                            password = "123456",
                        )
                    )
                )
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                userRentToken = response.getString("token")
            }

        // Busca as informações do usuário que ira alugar o livro.
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/user")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
            )
            .andExpect(status().isOk)

        // Cria um anuncio.
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "f1u-swEACAAJ",
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                announcementId = announcementView.id

                Assertions.assertEquals("f1u-swEACAAJ", announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }

        // Cria um anuncio.
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "QkW8EAAAQBAJ",
                            images = listOf(),
                            description = "description",
                            dailyValue = 10,
                            locationId = addressId,
                        )
                    )
                )
            )
            .andExpect {
                val announcementView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    AnnouncementView::class.java,
                )

                Assertions.assertEquals("QkW8EAAAQBAJ", announcementView.book.id)
                Assertions.assertEquals("description", announcementView.description)
                Assertions.assertEquals(0, announcementView.images.size)
                Assertions.assertEquals(10, announcementView.dailyValue)
                Assertions.assertEquals(addressId, announcementView.location.id)
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/announcements")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val announcements = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<AnnouncementView>::class.java,
                )

                for (announcement: AnnouncementView in announcements) {
                    if (announcement.id == announcementId) {
                        Assertions.assertTrue(announcement.isAvailable)
                    }
                }
            }

        // Aluga um livro.
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/rent")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateRentForm(
                            announcementId = announcementId,
                            startDate = "2023-09-23",
                            endDate = "2023-09-26",
                            value = 15.0,
                        )
                    )
                )
            )
            .andExpect(status().isOk)
            .andExpect {
                rentView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    RentView::class.java,
                )
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/announcements")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val announcements = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<AnnouncementView>::class.java,
                )

                for (announcement: AnnouncementView in announcements) {
                    if (announcement.id == announcementId) {
                        Assertions.assertFalse(announcement.isAvailable)
                    }
                }
            }
        
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/give_back")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        GiveBackForm(
                            id = rentView!!.id,
                            ratingMessage = "Tudo certo!",
                            ratingFeedback = true,
                        )
                    )
                )
            )
            .andExpect(status().isOk)
            
        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/announcements/available")
                .contentType("application/json")
                .header("Authorization", "Bearer $userRentToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val announcements = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<AnnouncementView>::class.java,
                )

                for (announcement: AnnouncementView in announcements) {
                    if (announcement.id == announcementId) {
                        Assertions.assertTrue(announcement.isAvailable)
                    }
                }
            }
    }

    /**
     * Limpa base de dados apos os testes.
     */

    companion object {
        private var userOneToken = ""

        private var userOneId = ""

        private var addressId = ""

        @JvmStatic
        @AfterAll
        fun clearDatabase(@Autowired mongoTemplate: MongoTemplate) {
            mongoTemplate.db.drop()
        }
    }
}