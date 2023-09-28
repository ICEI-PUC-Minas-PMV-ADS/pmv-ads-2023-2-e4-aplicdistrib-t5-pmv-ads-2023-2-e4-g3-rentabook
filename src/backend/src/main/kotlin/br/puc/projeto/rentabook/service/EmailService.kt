package br.puc.projeto.rentabook.service

import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailService(private val mailSender: JavaMailSender) {

    fun emailSender(toEmail: String, subject: String, body: String) {
        val message = SimpleMailMessage()
        message.subject = subject
        message.text = body
        message.setTo(toEmail)
        message.from = "rentabook.sup@gmail.com"

        mailSender.send(message)
    }
}