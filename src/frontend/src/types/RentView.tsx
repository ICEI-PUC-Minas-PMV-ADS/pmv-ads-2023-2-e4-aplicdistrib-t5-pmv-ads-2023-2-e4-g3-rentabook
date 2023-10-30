import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { AnnouncementView } from "./AnnouncementView";
import { PublicUserView } from "./PublicUserView";
import { RatingView } from "./RatingView";
import { ChatView } from "./ChatView";

export type RentView = {
  "id": String,
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
  "cancelled": boolean
}