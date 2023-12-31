import { Platform } from "react-native";
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView"
import { API } from "@env";

export const avaliableText = (item: CleanAnnouncementView) => {
  let text
  if (item.rent == true && item.sale == true && item.trade == true) {
    text = "Disponível para aluguel, compra e troca"
  }
  if (item.rent == true && item.sale == true && item.trade == false) {
    text = "Disponível para aluguel e compra"
  }
  if (item.rent == true && item.trade == true && item.sale == false) {
    text = "Disponível para aluguel e troca"
  }
  if (item.trade == true && item.sale == true && item.rent == false) {
    text = "Disponível para compra e troca"
  }
  if (item.rent == true && item.sale == false && item.trade == false) {
    text = "Disponível para aluguel"
  }
  if (item.sale == true && item.rent == false && item.trade == false) {
    text = "Disponível para compra"
  }
  if (item.trade == true && item.sale == false && item.rent == false) {
    text = "Disponível para troca"
  }
  return text
}

export const getValueRent = (item: CleanAnnouncementView) => (item.valueForRent == null ? "Valor a combinar" : "R$" + item.valueForRent.toFixed(2).toString().replace('.', ',') + "/diária")

export const getValueSale = (item: CleanAnnouncementView) => (item.valueForSale == null ? "Valor a combinar" : "R$" + item.valueForSale.toFixed(2).toString().replace('.', ','))

export const getFirstImageLink = (item: CleanAnnouncementView) => {
  const imageId = item.images[0] == null ? "noimage" : item.images[0]
  return (Platform.OS === 'web' ? API : "https://rentabookapi.azurewebsites.net") + '/public/image/' + imageId
}

export const getImageLink = (id: string) => {
  return (Platform.OS === 'web' ? API : "https://rentabookapi.azurewebsites.net") + '/public/image/' + id
}