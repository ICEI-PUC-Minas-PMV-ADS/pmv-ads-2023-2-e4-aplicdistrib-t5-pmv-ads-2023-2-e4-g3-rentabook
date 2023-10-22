import { ImageSourcePropType } from "react-native"
import { BookView } from "../../types/BookView"
const defaultImage: ImageSourcePropType = require("../assets/notFound.jpg")

export const getUrlImage = (item: BookView) => {
  const images = item.imageLinks
  if (images == null) {
    return defaultImage
  }
  if (images.extraLarge != null) {
    return images.extraLarge
  }
  if (images.large != null) {
    return images.large
  }
  if (images.medium != null) {
    return images.medium
  }
  if (images.small != null) {
    return images.small
  }
  if (images.smallThumbnail != null) {
    return images.smallThumbnail
  }
  if (images.thumbnail != null) {
    return images.thumbnail
  }
}