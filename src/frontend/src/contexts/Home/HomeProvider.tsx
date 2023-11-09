import { useContext, useEffect, useState } from "react"
import { useViaCep } from "../../hooks/useViaCep"
import { bookService } from "../../services/bookService"
import { BookView } from "../../types/BookView"
import { PrivateAddress } from "../../types/PrivateAddress"
import { HomeContext } from "./HomeContext"
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView"
import { announcementsService } from "../../services/announcementsService"
import { Page } from "../../types/Page"
import { AuthContext } from "../Auth/AuthContext"
import dropDownData from "../../data/dropDownData.json"

export const HomeProvider = ({ children }: { children: JSX.Element }) => {

  const authContext = useContext(AuthContext)
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true)
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [annoucementsInfiniteListIsLoading, setAnnoucementsInfiniteListIsLoading] = useState(true)
  const [inputCepValue, setInputCepValue] = useState("")
  const [inputCepError, setInputCepError] = useState(false)
  const [cepMessageError, setCepMessageError] = useState("error")
  const [selectedAddress, setSelectedAddress] = useState(authContext.defaultAddress);
  const [addressModalIsVisible, setAddressModalIsVisible] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("")
  const [querySort, setQuerySort] = useState(dropDownData[0].value);
  const [rentActiveInDropDown, setRentActiveInDropDown] = useState(true)
  const [saleActiveInDropDown, setSaleActiveInDropDown] = useState(true)
  const [searchByRentIsActive, setSearchByRentIsActive] = useState(false);
  const [searchByTradeIsActive, setSearchByTradeIsActive] = useState(false);
  const [searchBySaleIsActive, setSearchBySaleIsActive] = useState(false);
  const [bookResponse, setBookResponse] = useState<Page<BookView> | null>(null)
  const [announcementsResponse, setAnnouncementsResponse] = useState<Page<CleanAnnouncementView> | null>(null)
  const [announcementsData, setAnnouncementsData] = useState<[] | CleanAnnouncementView[]>([])
  const [cityForSearch, setCityForSearch] = useState<string | null>(null)
  const [bookIdForSearch, setBookIdForSearch] = useState<null | string>(null)
  const [page, setPage] = useState(0)
  const rentQueryOption = searchByRentIsActive ? true : null
  const tradeQueryOption = searchByTradeIsActive ? true : null
  const saleQueryOption = searchBySaleIsActive ? true : null
  const [searchModalIsVisible, setSearchModalIsVisible] = useState(false);


  useEffect(() => {
    setSelectedAddress(authContext.defaultAddress)
    if (authContext.defaultAddress?.cep) {
      setCityForSearch(authContext.defaultAddress.city)
      setInputCepValue(authContext.defaultAddress?.cep)
    } else {
      setCityForSearch(null)
      setInputCepValue("")
    }
  }, [authContext.defaultAddress])

  const loadAnnouncements = async (filtersChanged: boolean = false) => {
    if (authContext.infosLoaded) {
      if (filtersChanged == true) {
        const adds: Page<CleanAnnouncementView> = await announcementsService.getAnnouncements(cityForSearch, bookIdForSearch, rentQueryOption, tradeQueryOption, saleQueryOption, querySort, 0)
        setPage(0)
        setAnnouncementsResponse(adds)
        setAnnouncementsData(adds.content)
        setLoadingAnnouncements(false)
      }
      else {
        if (announcementsResponse?.last == false) {
          const adds: Page<CleanAnnouncementView> = await announcementsService.getAnnouncements(cityForSearch, bookIdForSearch, rentQueryOption, tradeQueryOption, saleQueryOption, querySort, page)
          setAnnouncementsResponse(adds)
          if (page != 0) {
            setAnnouncementsData([...announcementsData, ...adds.content])
          }
          setPage(page + 1)
        }
        else {
          setAnnoucementsInfiniteListIsLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    setLoadingAnnouncements(true)
    loadAnnouncements(true)
  }, [cityForSearch, bookIdForSearch, rentQueryOption, tradeQueryOption, saleQueryOption, querySort, authContext.infosLoaded])


  useEffect(() => {
    if (searchByRentIsActive == false && searchBySaleIsActive == false && searchByTradeIsActive == false) {
      setRentActiveInDropDown(true)
      setSaleActiveInDropDown(true)
    }
    if (searchByRentIsActive == true && searchBySaleIsActive == true && searchByTradeIsActive == true) {
      setRentActiveInDropDown(true)
      setSaleActiveInDropDown(true)
    }
    if (searchByRentIsActive == true && searchBySaleIsActive == true && searchByTradeIsActive == false) {
      setRentActiveInDropDown(true)
      setSaleActiveInDropDown(true)
    }
    if (searchByRentIsActive == true && searchByTradeIsActive == true && searchBySaleIsActive == false) {
      setRentActiveInDropDown(true)
      setSaleActiveInDropDown(false)
    }
    if (searchBySaleIsActive == true && searchByTradeIsActive == true && searchByRentIsActive == false) {
      setRentActiveInDropDown(false)
      setSaleActiveInDropDown(true)
    }
    if (searchByTradeIsActive == true && searchByRentIsActive == false && searchBySaleIsActive == false) {
      setRentActiveInDropDown(false)
      setSaleActiveInDropDown(false)
    }
    if (searchByRentIsActive == true && searchBySaleIsActive == false && searchByTradeIsActive == false) {
      setSaleActiveInDropDown(false)
    }
    if (searchBySaleIsActive == true && searchByRentIsActive == false && searchByTradeIsActive == false) {
      setRentActiveInDropDown(false)
    }
    setQuerySort(dropDownData[0].value)
  }, [searchByRentIsActive, searchBySaleIsActive, searchByTradeIsActive])





  const validateCEP = (cep: string): boolean => {
    const cepPattern = /^\d{8}$/;
    return cepPattern.test(cep);
  };

  const handleCep = async () => {
    const formatedCep = inputCepValue.replace('-', "")
    if (validateCEP(formatedCep)) {
      const data = await useViaCep(formatedCep)
      if (data.erro == true) {
        setInputCepError(true)
        setCepMessageError("CEP não encontrado!")
      }
      else {
        const address: PrivateAddress = {
          id: Math.random().toString(),
          name: "Cep personalizado",
          cep: data.cep,
          street: data.logradouro,
          number: "0",
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          complement: ""
        }
        authContext.setDefaultAddressLocalStorage(address)
        setAddressModalIsVisible(false)
        setCityForSearch(address.city)
      }
    } else {
      setInputCepError(true)
      setCepMessageError("Digite um cep válido de 8 números")
    }
  }

  const handleSearch = async (value: string) => {
    setLoadingBooks(true)
    if (value != null && value != "") {
      const data = await bookService.searchBook(value)
      setBookResponse(data)
    }
    setLoadingBooks(false)
  }

  const handleBook = (item: BookView) => {
    setBookIdForSearch(item.id)
    setInputSearchValue(item.title as string)
  }

  const cleanFilters = () => {
    authContext.removeDefaultAddress()
    setInputSearchValue("")
    setBookIdForSearch(null)
    setCityForSearch(null)
    setSearchByRentIsActive(false)
    setSearchBySaleIsActive(false)
    setSearchByTradeIsActive(false)
    setPage(0)
    setQuerySort(dropDownData[0].value)
  }




  return (
    <HomeContext.Provider value={{ loadingAnnouncements, inputCepValue, setInputCepValue, inputCepError, setInputCepError, cepMessageError, selectedAddress, setSelectedAddress, addressModalIsVisible, setAddressModalIsVisible, inputSearchValue, setInputSearchValue, querySort, setQuerySort, rentActiveInDropDown, saleActiveInDropDown, searchByRentIsActive, setSearchByRentIsActive, searchByTradeIsActive, setSearchByTradeIsActive, searchBySaleIsActive, setSearchBySaleIsActive, bookResponse, announcementsResponse, setCityForSearch, setBookIdForSearch, setPage, searchModalIsVisible, setSearchModalIsVisible, handleSearch, handleCep, handleBook, announcementsData, loadAnnouncements, annoucementsInfiniteListIsLoading, cleanFilters, loadingBooks }}>
      {children}
    </HomeContext.Provider>
  )
}
