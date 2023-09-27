package br.puc.projeto.rentabook.service

import br.puc.projeto.rentabook.dto.NotificationView
import br.puc.projeto.rentabook.mapper.NotificationViewMapper
import br.puc.projeto.rentabook.repository.NotificationRepository
import br.puc.projeto.rentabook.repository.UserRepository
import br.puc.projeto.rentabook.utils.AuthenticationUtils
import org.springframework.stereotype.Service

@Service
class NotificationService (
    private val userRepository: UserRepository,
    private val notificationRepository: NotificationRepository,
    private val notificationViewMapper: NotificationViewMapper
){
    fun getAllNotification () : List<NotificationView> {
        return AuthenticationUtils.authenticate(userRepository) {
           val notifications = notificationRepository.findAllByUserId(it.id!!)
                .map{ notificationViewMapper.map(it) }
            notificationRepository.deleteAllByUserId(it.id)
            notifications
        }
    }
}