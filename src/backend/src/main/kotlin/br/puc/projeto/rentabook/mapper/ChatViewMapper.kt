package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.ChatView
import br.puc.projeto.rentabook.model.Chat
import br.puc.projeto.rentabook.repository.RentRepository
import br.puc.projeto.rentabook.repository.SaleRepository
import br.puc.projeto.rentabook.repository.TradeRepository
import org.springframework.stereotype.Component
import java.lang.Exception

@Component
class ChatViewMapper(
    private val publicUserViewMapper: PublicUserViewMapper,
    private val rentRepository: RentRepository,
    private val saleRepository: SaleRepository,
    private val tradeRepository: TradeRepository,
) : Mapper<Chat, ChatView> {
    override fun map(t: Chat): ChatView {
        val trade = tradeRepository.findByChatId(t.id!!)
        val rent = rentRepository.findByChatId(t.id)
        val sale = saleRepository.findByChatId(t.id)
        return ChatView(
            id = t.id,
            owner = publicUserViewMapper.map(t.owner),
            lead = publicUserViewMapper.map(t.lead),
            latestMessageDate = t.latestMessageDate,
            trade = trade?.id,
            sale = sale?.id,
            rent = rent?.id
        )
    }

}