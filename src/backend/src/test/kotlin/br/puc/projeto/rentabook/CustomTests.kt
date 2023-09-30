package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.dto.*
import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.Gson
import org.json.JSONObject
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
class CustomTests {
    private lateinit var userOneId: String
    private lateinit var userOneToken: String

    private lateinit var userTwoId: String
    private lateinit var userTwoToken: String

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate

    @Autowired
    private lateinit var gson: Gson

    @BeforeEach
    fun clearDocument() {
        mongoTemplate.db.drop()
    }

    @Test
    fun `Roteiro para o video`() {
        var addressId = ""
        var announcementOneId = ""
        var announcementTwoId = ""
        var rentId = ""
        var saleId = ""
        var chatId = ""

        /**
         * Cadastrar usuario #1
         */

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

        /**
         * Cadastrar usuario #2
         */

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

        /**
         * Cadastrar endereço
         */

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

        /**
         * Cadastrar anuncio para o livro: Dona Branca
         */

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
                            value = 10,
                            locationId = addressId,
                            announcementType = CreateAnnouncementForm.SALE,
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
                announcementOneId = announcementView.id
            }

        /**
         * Cadastrar anuncio para o livro: Bran New Death
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "EA2M17ApuMEC",
                            images = listOf(),
                            description = "description",
                            value = 10,
                            locationId = addressId,
                            announcementType = CreateAnnouncementForm.RENT,
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
                announcementTwoId = announcementView.id
            }

        /**
         * Solicitar aluguel do livro: Dona Branca
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/rents/create")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        RentForm(
                            announcementId = announcementTwoId,
                            value = 10.0,
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
                rentId = rentView.id
                chatId = rentView.chat.id
            }

        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/chat/messages/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateChatMessageForm(
                            chatId = chatId,
                            message = "helloWorld!",
                        )
                    )
                )
            )
            .andExpect(status().isOk)

        /**
         * Completar solicitação de aluguel.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .put("/rents/$rentId/complete")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
            )
            .andExpect(status().isOk)

        /**
         * Listar livros disponiveis para anuncio.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/announcements/available")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)

        /**
         * Solicitar aluguel do livro: Dona Branca
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/sales/create")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        RentForm(
                            announcementId = announcementOneId,
                            value = 10.0,
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
                saleId = rentView.id
            }

        /**
         * Cancelar solicitação de aluguel.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .put("/sales/$saleId/cancel")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
    }

    @Test
    fun `Filtrar minhas meus alugueis`() {
        var addressId = ""
        var announcementOneId = ""
        var announcementTwoId = ""
        var rentOneId = ""
        var rentTwoId = ""

        /**
         * Cadastrar usuario #1
         */

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

        /**
         * Cadastrar usuario #2
         */

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

        /**
         * Cadastrar endereço
         */

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

        /**
         * Cadastrar anuncio para o livro: Dona Branca
         */

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
                            value = 10,
                            locationId = addressId,
                            announcementType = CreateAnnouncementForm.RENT,
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
                announcementOneId = announcementView.id
            }

        /**
         * Cadastrar anuncio para o livro: Bran New Death
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "EA2M17ApuMEC",
                            images = listOf(),
                            description = "description",
                            value = 10,
                            locationId = addressId,
                            announcementType = CreateAnnouncementForm.RENT,
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
                announcementTwoId = announcementView.id
            }

        /**
         * Solicitar aluguel do livro: Dona Branca
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/rents/create")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        RentForm(
                            announcementId = announcementTwoId,
                            value = 10.0,
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
                rentOneId = rentView.id
            }

        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/rents/own")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val rentList = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<RentView>::class.java
                )
                Assertions.assertEquals(1, rentList.size)
                Assertions.assertEquals(rentOneId, rentList[0].id)
            }

        /**
         * Solicitar aluguel do livro: Dona Branca
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/rents/create")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        RentForm(
                            announcementId = announcementOneId,
                            value = 10.0,
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
                rentTwoId = rentView.id
            }

        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/rents/own")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val rentList = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<RentView>::class.java
                )
                Assertions.assertEquals(2, rentList.size)
                Assertions.assertEquals(rentOneId, rentList[0].id)
                Assertions.assertEquals(rentTwoId, rentList[1].id)
            }

        /**
         * Tenta finalizar a compra com o token do lead e falha.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .put("/rents/$rentOneId/complete")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().is5xxServerError)

        /**
         * Finaliza a compra com o token do owner.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .put("/rents/$rentOneId/complete")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
            )
            .andExpect(status().isOk)



        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/rents/own")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val rentList = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<RentView>::class.java
                )
                Assertions.assertEquals(1, rentList.size)
                Assertions.assertEquals(rentTwoId, rentList[0].id)
            }
    }

    @Test
    fun `Filtrar minhas minhas venda`() {
        var addressId = ""
        var announcementOneId = ""
        var announcementTwoId = ""
        var saleOneId = ""
        var saleTwoId = ""

        /**
         * Cadastrar usuario #1
         */

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

        /**
         * Cadastrar usuario #2
         */

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

        /**
         * Cadastrar endereço
         */

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

        /**
         * Cadastrar anuncio para o livro: Dona Branca
         */

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
                            value = 10,
                            locationId = addressId,
                            announcementType = CreateAnnouncementForm.SALE,
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
                announcementOneId = announcementView.id
            }

        /**
         * Cadastrar anuncio para o livro: Bran New Death
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/announcements/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateAnnouncementForm(
                            bookId = "EA2M17ApuMEC",
                            images = listOf(),
                            description = "description",
                            value = 10,
                            locationId = addressId,
                            announcementType = CreateAnnouncementForm.SALE,
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
                announcementTwoId = announcementView.id
            }

        /**
         * Solicitar venda do livro: Dona Branca
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/sales/create")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        RentForm(
                            announcementId = announcementTwoId,
                            value = 10.0,
                        )
                    )
                )
            )
            .andExpect(status().isOk)
            .andExpect {
                val saleView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    SaleView::class.java
                )
                saleOneId = saleView.id
            }

        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/sales/own")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val saleList = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<SaleView>::class.java
                )
                Assertions.assertEquals(1, saleList.size)
                Assertions.assertEquals(saleOneId, saleList[0].id)
            }

        /**
         * Solicitar venda do livro: Dona Branca
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/sales/create")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        RentForm(
                            announcementId = announcementOneId,
                            value = 10.0,
                        )
                    )
                )
            )
            .andExpect(status().isOk)
            .andExpect {
                val saleView = gson.fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    SaleView::class.java
                )
                saleTwoId = saleView.id
            }

        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/sales/own")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val saleList = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<SaleView>::class.java
                )
                Assertions.assertEquals(2, saleList.size)
                Assertions.assertEquals(saleOneId, saleList[0].id)
                Assertions.assertEquals(saleTwoId, saleList[1].id)
            }

        /**
         * Tenta finalizar a compra com o token do lead e falha.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .put("/sales/$saleOneId/complete")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().is5xxServerError)

        /**
         * Finaliza a compra com o token do owner.
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .put("/sales/$saleOneId/complete")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
            )
            .andExpect(status().isOk)



        /**
         * Enviar uma mensagem no chat
         */

        mockMvc.perform(
            MockMvcRequestBuilders
                .get("/sales/own")
                .contentType("application/json")
                .header("Authorization", "Bearer $userTwoToken")
            )
            .andExpect(status().isOk)
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))
                val saleList = gson.fromJson(
                    response.getJSONArray("content").toString(),
                    Array<RentView>::class.java
                )
                Assertions.assertEquals(1, saleList.size)
                Assertions.assertEquals(saleTwoId, saleList[0].id)
            }
    }
}