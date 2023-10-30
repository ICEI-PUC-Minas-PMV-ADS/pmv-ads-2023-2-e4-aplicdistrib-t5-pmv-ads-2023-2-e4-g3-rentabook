import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { PublicUserView } from "./PublicUserView";
import { RatingView } from "./RatingView";
import { ChatView } from "./ChatView";
import { AnnouncementView } from "./AnnouncementView";

export type SaleView = {
  "id": string,
  "announcement": AnnouncementView,
  "ownerUser": PublicUserView,
  "createData": string,
  "startDate": string,
  "endDate": string | null,
  "value": Double,
  "lead": PublicUserView,
  "rating": RatingView | null,
  "chat": ChatView,
  "accepted": boolean,
  "cancelled": boolean,
}