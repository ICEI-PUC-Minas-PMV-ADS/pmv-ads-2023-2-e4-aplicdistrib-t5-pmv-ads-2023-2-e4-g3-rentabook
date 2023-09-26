package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.utils.adapters.LocalDateAdapter
import br.puc.projeto.rentabook.utils.adapters.LocalDateTimeAdapter
import br.puc.projeto.rentabook.dto.*
import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.Gson
import com.google.gson.GsonBuilder
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
import java.time.LocalDate
import java.time.LocalDateTime

@ExtendWith(SpringExtension::class)
@AutoConfigureMockMvc
@SpringBootTest(properties = ["spring.data.mongodb.database=rentabook_db_test"])
class ChatTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate

    @Autowired
    private lateinit var gson: Gson

    /**
     * Inicia os usuário de teste e pega suas respectivar credenciais e ids.
     */

    @BeforeEach
    fun initializeDatabase() {
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/register")
                .contentType("application/json")
                .content(
                    ObjectMapper().writeValueAsString(
                        UserForm(
                            name = "John",
                            email = "john@email.com",
                            password = "123456",
                        )
                    )
                )
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                userOneToken = response.getString("token")
            }

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
                userTwoToken = response.getString("token")
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/user")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                userTwoId = response.getString("id")
            }

    }

    @BeforeEach
    fun clearDocument() {
        mongoTemplate.db.drop()
    }

    /**
     * Teste:       T-008
     * Requisito:   RF-008
     * Objetivo:    Tentar criar um chat entre dois usuários.
     */
    @Test
    fun `T008 - Criar chat`() {
        var addressId = ""
        var announcementId = ""

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
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/rent")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
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
                val rentView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    RentView::class.java
                )

                Assertions.assertNotNull(rentView.chat)
                Assertions.assertEquals(userOneId, rentView.chat.owner.id)
                Assertions.assertEquals(userTwoId, rentView.chat.lead.id)
            }
    }

    /**
     * Teste:       T-009
     * Requisito:   RF-008
     * Objetivo:    Tentar criar uma mensagem de chat entre dois usuários.
     */
    @Test
    fun `T008 - Criar mensagem de chat entre dois usuarios`() {
        var addressId = ""
        var announcementId = ""
        var chatId = ""

        val message = "Hello world!"

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
            .andExpect(status().isOk)
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
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/rent")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
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
                val rentView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    RentView::class.java
                )

                Assertions.assertNotNull(rentView.chat)
                Assertions.assertEquals(userOneId, rentView.chat.owner.id)
                Assertions.assertEquals(userTwoId, rentView.chat.lead.id)

                chatId = rentView.chat.id
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/chat/messages/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateChatMessageForm(
                            chatId = chatId,
                            message = message,
                        )
                    )
                )
            )
            .andExpect(status().isOk())
            .andExpect {
                val chatMessageView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    ChatMessageView::class.java,
                )
                Assertions.assertEquals(message, chatMessageView.message)
                Assertions.assertEquals(userOneId, chatMessageView.sender.id)
            }
    }

    /**
     * Teste:       T-013
     * Requisito:   RF-008
     * Objetivo:    Tentar listar as mensagens mais recentes enviadas no chat.
     */
    @Test
    fun `T013 - Listar as mensagens recentes enviadas no chat`() {
        var addressId = ""
        var announcementId = ""
        var chatId = ""

        val message = "Hello world!"

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
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/rent")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
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
                val rentView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    RentView::class.java
                )

                Assertions.assertNotNull(rentView.chat)
                Assertions.assertEquals(userOneId, rentView.chat.owner.id)
                Assertions.assertEquals(userTwoId, rentView.chat.lead.id)

                chatId = rentView.chat.id
            }

        for (i in 0 until 20) {
            val userToken = if (i % 2 == 0)
                userOneToken // John
            else
                userTwoToken // Mary

            mockMvc.perform(
                MockMvcRequestBuilders
                    .post("/chat/messages/new")
                    .contentType("application/json")
                    .header("Authorization", "Bearer $userToken")
                    .content(
                        ObjectMapper().writeValueAsString(
                            CreateChatMessageForm(
                                chatId = chatId,
                                message = "$i: $message",
                            )
                        )
                    )
                )
                .andExpect(status().isOk)
        }

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/chat/$chatId/recent_messages")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val chatMessages = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<ChatMessageView>::class.java,
                )

                Assertions.assertEquals(10, chatMessages.size)
                Assertions.assertEquals("19: Hello world!", chatMessages[0].message)
                Assertions.assertEquals("Mary", chatMessages[0].sender.name)

                Assertions.assertEquals("18: Hello world!", chatMessages[1].message)
                Assertions.assertEquals("John", chatMessages[1].sender.name)
            }
    }

    /**
     * Limpa base de dados apos os testes.
     */

    companion object {
        private var userOneToken = ""
        private var userTwoToken = ""

        private var userOneId = ""
        private var userTwoId = ""

        @JvmStatic
        @AfterAll
        fun clearDatabase(@Autowired mongoTemplate: MongoTemplate) {
            mongoTemplate.db.drop()
        }
    }
}