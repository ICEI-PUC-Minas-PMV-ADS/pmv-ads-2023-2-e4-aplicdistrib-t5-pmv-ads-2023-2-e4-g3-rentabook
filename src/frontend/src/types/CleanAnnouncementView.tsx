import { PublicUserView } from "./PublicUserView"
import { PublicAddressView } from "./PublicAddressView"
import { BookView } from "./BookView"
import { Double } from "react-native/Libraries/Types/CodegenTypes"
export type CleanAnnouncementView = {
    "id": string,
    "book": BookView,
    "ownerUser": PublicUserView,
    "images": string[],
    "description": string,
    "createdDate": string,
    "isAvailable": boolean,
    "rent": boolean,
    "sale": boolean,
    "trade": boolean,
    "valueForRent": Double | null,
    "valueForSale": Double | null
    "location": PublicAddressView
    "averageStars": number,
    "totalRatings": number
    "status": string,
    "wasReturn": string,
}