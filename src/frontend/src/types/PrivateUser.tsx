import { PrivateAddress } from "./PrivateAddress";

export type PrivateUser = {
  id: string,
  name: string,
  userImage: string | null,
  email: string,
  booksId: string[] | null[],
  addresses: PrivateAddress[] | null[],
}