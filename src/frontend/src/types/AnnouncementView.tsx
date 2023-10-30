import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { PrivateAddress } from "./PrivateAddress";
import { PublicUserView } from "./PublicUserView";
import { ImageView } from "./ImageView";

export type AnnouncementView = {
  "id": String,
  "book": object,
  "ownerUser": PublicUserView,
  "images": ImageView[],
  "description": string,
  "createdDate": string,
  "isAvailable": boolean,
  "rent": boolean,
  "sale": boolean,
  "trade": boolean,
  "valueForSale": Double | null,
  "valueForRent": Double | null,
  "location": PrivateAddress,
}