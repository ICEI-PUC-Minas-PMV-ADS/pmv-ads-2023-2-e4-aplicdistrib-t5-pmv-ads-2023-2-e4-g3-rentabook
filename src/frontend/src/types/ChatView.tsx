import { PublicUserView } from "./PublicUserView"

export type ChatView = {
  "id": string,
  "owner": PublicUserView,
  "lead": PublicUserView,
  "latestMessageDate": string,
  "sale": string | null,
  "trade": string | null,
  "rent": string | null
}