import { ImageLinksGoogleBooks } from "./ImageLinksGoogleBooks"
export type BookView = {
  'id': string,
  'title': string | null,
  'authors': string[] | null[],
  'publisher': string | null,
  'publishedDate': string | null,
  'description': string | null,
  'imageLinks': ImageLinksGoogleBooks | null,
  'pageCount': number | null
}