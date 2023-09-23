package br.puc.projeto.rentabook.controller

import br.puc.projeto.rentabook.dto.ChatMessageView
import br.puc.projeto.rentabook.dto.CreateChatMessageForm
import br.puc.projeto.rentabook.service.ChatMessageService
import br.puc.projeto.rentabook.service.ChatService
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/chat")
class ChatController(
    private val chatService: ChatService,
    private val chatMessageService: ChatMessageService,
) {
    @SecurityRequirement(
        name = "bearerAuth"
    )
    @PostMapping("/messages/new")
    fun createChatMessage(@RequestBody createChatMessageForm: CreateChatMessageForm): ChatMessageView {
        return chatMessageService.createChatMessage(createChatMessageForm)
    }

    @SecurityRequirement(
        name = "bearerAuth"
    )
    @GetMapping("/{chat}/recent_messages")
    fun getRecentMessages(
        @PathVariable chat: String,
        @PageableDefault(size = 10) pageable: Pageable,
    ): Page<ChatMessageView> {
        return chatMessageService.getRecentMessages(chat, pageable)
    }
}