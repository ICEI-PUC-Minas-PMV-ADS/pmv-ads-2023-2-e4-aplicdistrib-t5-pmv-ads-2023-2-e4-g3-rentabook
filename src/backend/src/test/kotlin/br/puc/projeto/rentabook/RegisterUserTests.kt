package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.dto.UpdateProfileForm
import br.puc.projeto.rentabook.dto.UserForm
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
            .post("/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(
                UserForm(
                name = "John",
                email = "john@email.com",
                password = "123456",
            )
            )))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect {
                val response = JSONObject(it.response.contentAsString)
                val token = response.getString("token")

                Assertions.assertNotNull(token)
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
            .post("/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(
                UserForm(
                    name = "John",
                    email = "john@email.com",
                    password = "123456",
                )
            )))

        mockMvc.perform(MockMvcRequestBuilders
            .post("/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(
                UserForm(
                    name = "John",
                    email = "john@email.com",
                    password = "123456",
                )
            )))
            .andExpect(status().is5xxServerError)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))

                val status = response.getInt("status")
                Assertions.assertEquals(500, status)

                val error = response.getString("message")
                Assertions.assertEquals("Este email já esta em uso!", error)
            }
    }

    /**
     * Teste:       T-007
     * Requisito:   RF-006
     * Objetivo:    Tentar efetuar a alteração do nome do usuário.
     */
    @Test
    fun `T007 - Atualiza usuario`() {
        var token = ""
        val newName = "John2"

        mockMvc.perform(MockMvcRequestBuilders
            .post("/register")
            .contentType("application/json")
            .content(ObjectMapper().writeValueAsString(
                UserForm(
                    name = "John",
                    email = "john@email.com",
                    password = "123456",
                )
            )))
            .andExpect {
                val response = JSONObject(it.response.contentAsString)
                token = response.getString("token")
            }

        mockMvc.perform(MockMvcRequestBuilders
            .post("/user/updateProfile")
            .contentType("application/json")
            .header("Authorization", "Bearer $token")
            .content(ObjectMapper().writeValueAsString(
                UpdateProfileForm(
                    name = "John2"
                )
            )))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect {
                val response = JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))

                val name = response.getString("name")
                Assertions.assertEquals(newName, name)
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