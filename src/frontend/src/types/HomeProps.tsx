import { PrivateAddress } from "./PrivateAddress"
import { Page } from "./Page"
import { BookView } from "./BookView"
import { CleanAnnouncementView } from "./CleanAnnouncementView"

export type HomeProps = {
  loadingAnnouncements: boolean, 
  inputCepValue: string, 
  setInputCepValue: React.Dispatch<React.SetStateAction<string>>, 
  inputCepError: boolean, 
  setInputCepError: React.Dispatch<React.SetStateAction<boolean>>, 
  cepMessageError: string, 
  selectedAddress: PrivateAddress | null,
  setSelectedAddress: React.Dispatch<React.SetStateAction<PrivateAddress | null>>, 
  addressModalIsVisible: boolean, 
  setAddressModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>, 
  inputSearchValue: string, 
  setInputSearchValue: React.Dispatch<React.SetStateAction<string>>, 
  querySort: string, 
  setQuerySort: React.Dispatch<React.SetStateAction<string>>, 
  rentActiveInDropDown: boolean,
  saleActiveInDropDown: boolean, 
  searchByRentIsActive: boolean, 
  setSearchByRentIsActive: React.Dispatch<React.SetStateAction<boolean>>, 
  searchByTradeIsActive: boolean, 
  setSearchByTradeIsActive: React.Dispatch<React.SetStateAction<boolean>>, 
  searchBySaleIsActive: boolean, 
  setSearchBySaleIsActive: React.Dispatch<React.SetStateAction<boolean>>, 
  bookResponse: Page<BookView> | null, 
  announcementsResponse: Page<CleanAnnouncementView> | null, 
  setCityForSearch: React.Dispatch<React.SetStateAction<string | null>>, 
  setBookIdForSearch: React.Dispatch<React.SetStateAction<string | null>>,  
  setPage: React.Dispatch<React.SetStateAction<number>>, 
  searchModalIsVisible: boolean, 
  setSearchModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>, 
  handleSearch: (value: string) => Promise<void>, 
  handleCep: () => Promise<void>, 
  handleBook: (item: BookView) => void,
  announcementsData: [] | CleanAnnouncementView[],
  loadAnnouncements: () => Promise<void>,
  annoucementsInfiniteListIsLoading: boolean,
  cleanFilters: () => void,
  loadingBooks: boolean
}