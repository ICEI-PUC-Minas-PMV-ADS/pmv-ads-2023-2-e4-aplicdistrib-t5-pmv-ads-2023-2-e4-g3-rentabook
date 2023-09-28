package br.puc.projeto.rentabook.repository

import br.puc.projeto.rentabook.model.Announcement
import br.puc.projeto.rentabook.model.Sale
import br.puc.projeto.rentabook.model.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface SaleRepository : MongoRepository<Sale, String> {
 fun findByAcceptedAndAnnouncementOwnerUserId (accepted: Boolean?, ownerUser: String?, pageable: Pageable): Page <Sale>

 fun findByBuyerUser (buyerUser: String?, pageable: Pageable): Page <Sale>
 fun findByAnnouncementId(announcementId: String, pageable: Pageable): Page <Sale>
}


