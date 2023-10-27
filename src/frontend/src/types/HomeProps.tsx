import { PrivateAddress } from "./PrivateAddress"
import { Page } from "./Page"
import { BookView } from "./BookView"
import { CleanAnnouncementView } from "./CleanAnnouncementView"

export type HomeProps = {
  loading: boolean, 
  inputValue: string, 
  setInputValue: React.Dispatch<React.SetStateAction<string>>, 
  inputError: boolean, 
  setInputError: React.Dispatch<React.SetStateAction<boolean>>, 
  messageError: string, 
  selectedAddress: PrivateAddress | null,
  setSelectedAddress: React.Dispatch<React.SetStateAction<PrivateAddress | null>>, 
  isVisible: boolean, 
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>, 
  searchValue: string, 
  setSearchValue: React.Dispatch<React.SetStateAction<string>>, 
  sort: string, 
  setSort: React.Dispatch<React.SetStateAction<string>>, 
  rentSort: boolean,
  saleSort: boolean, 
  rent: boolean, 
  setRent: React.Dispatch<React.SetStateAction<boolean>>, 
  trade: boolean, 
  setTrade: React.Dispatch<React.SetStateAction<boolean>>, 
  sale: boolean, 
  setSale: React.Dispatch<React.SetStateAction<boolean>>, 
  bookData: Page<BookView> | null, 
  data: Page<CleanAnnouncementView> | null, 
  setCity: React.Dispatch<React.SetStateAction<string | null>>, 
  setBookId: React.Dispatch<React.SetStateAction<string | null>>, 
  page: number, 
  setPage: React.Dispatch<React.SetStateAction<number>>, 
  searchOpen: boolean, 
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>, 
  handleSearch: (value: string) => Promise<void>, 
  handleCep: () => Promise<void>, 
  handleBook: (item: BookView) => void,
  announcementsData: [] | CleanAnnouncementView[],
  loadAnnouncements: () => Promise<void>,
  listLoading: boolean
}