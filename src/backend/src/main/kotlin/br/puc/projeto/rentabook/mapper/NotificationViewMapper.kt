package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.NotificationView
import br.puc.projeto.rentabook.model.Notification
import org.springframework.stereotype.Component

@Component
class NotificationViewMapper(
) : Mapper<Notification, NotificationView> {
    override fun map(t: Notification): NotificationView {
        return NotificationView(
            id = t.id  ?: throw Exception("Mensagem não localizada!!!"),
            userId = t.userId,
            createData = t.createData ,
            message =  t.message
        )
    }
}