import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { AnnouncementView } from "./AnnouncementView";
import { ChatView } from "./ChatView";
import { PublicUserView } from "./PublicUserView";
import { RatingView } from "./RatingView";

export type TradeView = {
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