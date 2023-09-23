package br.puc.projeto.rentabook.mapper

import br.puc.projeto.rentabook.dto.ImageView
import br.puc.projeto.rentabook.model.Image
import org.springframework.stereotype.Component

@Component
class ImageViewMapper : Mapper<Image, ImageView> {
    override fun map(t: Image): ImageView {
        return ImageView(
            id = t.id,
            path = t.path,
            type = t.type,
        )
    }
}