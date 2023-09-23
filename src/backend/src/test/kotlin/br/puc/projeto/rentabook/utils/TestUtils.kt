package br.puc.projeto.rentabook.utils

import br.puc.projeto.rentabook.dto.UserForm
import com.fasterxml.jackson.databind.ObjectMapper
import org.json.JSONObject
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultMatcher
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.nio.charset.StandardCharsets

object TestUtils {

    /**
     * Cria usuário.
     */

    fun createUser(
        mockMvc: MockMvc,
        name: String,
        email: String,
        password: String,
        onCreate: (JSONObject) -> Unit = {},
        expectedStatusCode: ResultMatcher = status().isOk
    ) {
        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .post("/register")
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .content(
                        ObjectMapper()
                            .writeValueAsString(
                                UserForm(
                                    name = name,
                                    email = email,
                                    password = password,
                                )
                            )
                    )

            )
            .andExpect(expectedStatusCode)
            .andExpect { onCreate(JSONObject(it.response.getContentAsString(StandardCharsets.UTF_8))) }
    }
}