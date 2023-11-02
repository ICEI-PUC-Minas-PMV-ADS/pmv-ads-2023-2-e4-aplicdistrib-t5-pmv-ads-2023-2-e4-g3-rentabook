
export type RatingForm = {
  "negotiation": "RENT" | "SALE" | "TRADE",
  "idNegotiation": string,
  "stars": 1 | 2 | 3 | 4 | 5,
  "message": string | null
}