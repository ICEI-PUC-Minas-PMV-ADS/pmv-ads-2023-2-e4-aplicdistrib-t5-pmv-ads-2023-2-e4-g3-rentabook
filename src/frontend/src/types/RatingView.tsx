import { CleanAnnouncementView } from "./CleanAnnouncementView"
import { Negotiations } from "./Negotiations"
import { PublicUserView } from "./PublicUserView"

export type RatingView = {
  "id": string,
  "owner": PublicUserView,
  "announcement": CleanAnnouncementView,
  "negotiation": "RENT" | "SALE" | "TRADE",
  "idNegotiation": string,
  "stars": number,
  "message": string | null
}