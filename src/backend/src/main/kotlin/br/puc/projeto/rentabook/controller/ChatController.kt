package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.ChatMessageView
import br.puc.projeto.rentabook.dto.ChatView
import br.puc.projeto.rentabook.dto.CreateChatForm
import br.puc.projeto.rentabook.dto.CreateChatMessageForm
import br.puc.projeto.rentabook.service.ChatMessageService
import br.puc.projeto.rentabook.service.ChatService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ChatController(
    private val chatService: ChatService,
    private val chatMessageService: ChatMessageService,
) {

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/chat/new")
    fun createChat(@RequestBody createChatForm: CreateChatForm): ChatView {
        return chatService.createChat(createChatForm)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/chat_messages/new")
    fun createChatMessage(@RequestBody createChatMessageForm: CreateChatMessageForm): ChatMessageView {
        return chatMessageService.createChatMessage(createChatMessageForm)
    }
}