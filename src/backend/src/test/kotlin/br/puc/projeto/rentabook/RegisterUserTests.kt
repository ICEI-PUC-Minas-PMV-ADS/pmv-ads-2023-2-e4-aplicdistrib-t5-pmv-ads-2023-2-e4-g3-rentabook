package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.forms.UserForm
import br.puc.projeto.rentabook.views.UserView
import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.Gson
import org.json.JSONObject
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.nio.charset.Charset
import java.nio.charset.StandardCharsets

@AutoConfigureMockMvc
@SpringBootTest(properties = ["spring.data.mongodb.database=rentabook_db_test"])
class RegisterUserTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate

    @BeforeEach
    fun clearDocument() {
        mongoTemplate.getCollection("users").drop()
    }

    /**
     * Teste:       T-001
     * Requisito:   RF-001
     * Objetivo:    Tentar cadastrar um usuário com sucesso enviando os dados esperados.
     */

    @Test
    fun `T001 - Cadastrar usuario`() {
        mockMvc.perform(MockMvcRequestBuilders
            .post("/user/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(UserForm(
                name = "John",
                email = "john@email.com",
                password = "123456",
            ))))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect {
                val response = JSONObject(it.response.contentAsString)
                val data = Gson().fromJson(response.getJSONObject("data").toString(), UserView::class.java)

                Assertions.assertEquals("John", data.name)
                Assertions.assertEquals("john@email.com", data.email)
            }
    }

    /**
     * Teste:       T-002
     * Requisito:   RF-001
     * Objetivo:    Tentar cadastrar um usuário com dados invalidos.
     */

    @Test
    fun `T002 - Cadastrar usuario - email ja existe`() {
        mockMvc.perform(MockMvcRequestBuilders
            .post("/user/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(UserForm(
                name = "John",
                email = "john@email.com",
                password = "123456",
            ))))

        mockMvc.perform(MockMvcRequestBuilders
            .post("/user/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(UserForm(
                name = "John",
                email = "john@email.com",
                password = "123456",
            ))))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))

                val status = response.getString("status")
                Assertions.assertEquals("error", status)

                val data = response.getJSONObject("data")
                val error = data.getString("message")

                Assertions.assertEquals("Este email já foi registrado!", error)
            }
    }

    /**
     * Limpa base de dados apos os testes.
     */

    companion object {
        @JvmStatic
        @AfterAll
        @BeforeAll
        fun clearDatabase(@Autowired mongoTemplate: MongoTemplate) {
            mongoTemplate.db.drop()
        }
    }
}