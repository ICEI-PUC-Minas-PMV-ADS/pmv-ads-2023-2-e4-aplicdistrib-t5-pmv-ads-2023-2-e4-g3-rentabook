package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.dto.*
import br.puc.projeto.rentabook.model.ChatMessage
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
class ChatTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate

    /**
     * Inicia os usuário de teste e pega suas respectivar credenciais e ids.
     */

    @BeforeEach
    fun initializeDatabase() {
        if (userOneId.isEmpty()) {
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
        }

        if (userTwoId.isEmpty()) {
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
    }

    @BeforeEach
    fun clearDocument() {
        mongoTemplate.getCollection("chats").drop()
        mongoTemplate.getCollection("chat_messages").drop()
    }

    /**
     * Teste:       T-008
     * Requisito:   RF-008
     * Objetivo:    Tentar criar um chat entre dois usuários.
     */
    @Test
    fun `T008 - Criar chat`() {
        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/chat/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateChatForm(
                            ownerId = userOneId,
                            leadId = userTwoId,
                        )
                    )
                )
            )
            .andExpect(status().isOk())
            .andExpect {
                val chatView = Gson().fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    ChatView::class.java,
                )
                Assertions.assertNotNull(chatView)
                Assertions.assertNotNull(chatView.id)
            }
    }

    /**
     * Teste:       T-009
     * Requisito:   RF-008
     * Objetivo:    Tentar criar uma mensagem de chat entre dois usuários.
     */
    @Test
    fun `T008 - Criar mensagem de chat entre dois usuarios`() {
        lateinit var chatView: ChatView
        val message = "Hello world!"

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/chat/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateChatForm(
                            ownerId = userOneId,
                            leadId = userTwoId,
                        )
                    )
                )
            )
            .andExpect(status().isOk())
            .andExpect {
                chatView = Gson().fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    ChatView::class.java,
                )
            }

        mockMvc.perform(
            MockMvcRequestBuilders
                .post("/chat_messages/new")
                .contentType("application/json")
                .header("Authorization", "Bearer $userOneToken")
                .content(
                    ObjectMapper().writeValueAsString(
                        CreateChatMessageForm(
                            chatId = chatView.id,
                            message = message,
                        )
                    )
                )
            )
            .andExpect(status().isOk())
            .andExpect {
                val chatMessageView = Gson().fromJson(
                    it.response.getContentAsString(StandardCharsets.UTF_8),
                    ChatMessageView::class.java,
                )
                Assertions.assertEquals(message, chatMessageView.message)
                Assertions.assertEquals(userOneId, chatMessageView.sender.id)
                Assertions.assertEquals(chatView.id, chatMessageView.chat.id)
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