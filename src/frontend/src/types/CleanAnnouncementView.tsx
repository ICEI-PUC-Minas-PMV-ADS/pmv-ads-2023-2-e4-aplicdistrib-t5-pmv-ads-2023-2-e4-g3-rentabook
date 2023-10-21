import { PublicUserView } from "./PublicUserView"
import { PublicAddressView } from "./PublicAddressView"
import { BookView } from "./BookView"
export type CleanAnnouncementView = {
    "id": string,
    "book": BookView,
    "ownerUser": PublicUserView,
    "images": string,
    "description": string,
    "createdDate": string,
    "isAvailable": boolean,
    "rent": boolean,
    "sale": boolean,
    "trade": boolean,
    "value": number,
    "location": PublicAddressView
}