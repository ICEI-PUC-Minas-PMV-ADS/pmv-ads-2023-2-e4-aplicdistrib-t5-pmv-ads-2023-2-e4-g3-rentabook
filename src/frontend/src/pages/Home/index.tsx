import React, { useContext, useEffect, useState } from "react";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";
import { Desktop, MobileAndTablet } from "../../hooks/useResposive";
import { announcementsService } from "../../services/announcementsService";
import { Page } from "../../types/Page";
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView";
import dropDownData from "../../data/dropDownData.json"
import { bookService } from "../../services/bookService";
import { BookView } from "../../types/BookView";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { PrivateAddress } from "../../types/PrivateAddress";
import { useViaCep } from "../../hooks/useViaCep";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

export default function Home() {
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [listLoading, setListLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState(false)
  const [messageError, setMessageError] = useState("error")
  const [selectedAddress, setSelectedAddress] = useState(authContext.defaultAddress);
  const [isVisible, setIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const [sort, setSort] = useState(dropDownData[0].value);
  const [rentSort, setRentSort] = useState(true)
  const [saleSort, setSaleSort] = useState(true)
  const [rent, setRent] = useState(false);
  const [trade, setTrade] = useState(false);
  const [sale, setSale] = useState(false);
  const [bookData, setbookData] = useState<Page<BookView> | null>(null)
  const [data, setData] = useState<Page<CleanAnnouncementView> | null>(null)
  const [announcementsData, setAnnouncementsData] = useState<[] | CleanAnnouncementView[]>([])
  const [city, setCity] = useState<string | null>(null)
  const [bookId, setBookId] = useState<null | string>(null)
  const [page, setPage] = useState(0)
  const rentOption = rent ? true : null
  const tradeOption = trade ? true : null
  const saleOption = sale ? true : null
  const [searchOpen, setSearchOpen] = useState(false);


  useEffect(() => {
    setSelectedAddress(authContext.defaultAddress)
    if (authContext.defaultAddress?.cep) {
      setCity(authContext.defaultAddress.city)
      setInputValue(authContext.defaultAddress?.cep)
    } else {
      setCity(null)
      setInputValue("")
    }
  }, [authContext.defaultAddress])

  const loadAnnouncements = async (filtersChanged: boolean = false) => {
    if (authContext.infosLoaded) {
      if (filtersChanged == true) {
        console.log('filtrou')
        const adds: Page<CleanAnnouncementView> = await announcementsService.getAnnouncements(city, bookId, rentOption, tradeOption, saleOption, sort, 0)
        setPage(0)
        setData(adds)
        setAnnouncementsData(adds.content)
        setLoading(false)
      }
      else {
        if (data?.last == false) {
          setListLoading(true)
          const adds: Page<CleanAnnouncementView> = await announcementsService.getAnnouncements(city, bookId, rentOption, tradeOption, saleOption, sort, page)
          setData(adds)
          if (page != 0) {
            setAnnouncementsData([...announcementsData, ...adds.content])
          }
          setPage(page + 1)
          setListLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    loadAnnouncements(true)
  }, [city, bookId, rentOption, tradeOption, saleOption, sort, authContext.infosLoaded])


  useEffect(() => {
    if (rent == false && sale == false && trade == false) {
      setRentSort(true)
      setSaleSort(true)
    }
    if (rent == true && sale == true && trade == true) {
      setRentSort(true)
      setSaleSort(true)
    }
    if (rent == true && sale == true && trade == false) {
      setRentSort(true)
      setSaleSort(true)
    }
    if (rent == true && trade == true && sale == false) {
      setRentSort(true)
      setSaleSort(false)
    }
    if (sale == true && trade == true && rent == false) {
      setRentSort(false)
      setSaleSort(true)
    }
    if (trade == true && rent == false && sale == false) {
      setRentSort(false)
      setSaleSort(false)
    }
    if (rent == true && sale == false && trade == false) {
      setSaleSort(false)
    }
    if (sale == true && rent == false && trade == false) {
      setRentSort(false)
    }
    setSort(dropDownData[0].value)
  }, [rent, sale, trade])





  const validateCEP = (cep: string): boolean => {
    const cepPattern = /^\d{8}$/;
    return cepPattern.test(cep);
  };

  const handleCep = async () => {
    const formatedCep = inputValue.replace('-', "")
    if (validateCEP(formatedCep)) {
      const data = await useViaCep(formatedCep)
      if (data.erro == true) {
        setInputError(true)
        setMessageError("CEP não encontrado!")
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
        setIsVisible(false)
        setCity(address.city)
      }
    } else {
      setInputError(true)
      setMessageError("Digite um cep válido de 8 números")
    }
  }

  const handleSearch = async (value: string) => {
    if (value != null && value != "") {
      const data = await bookService.searchBook(value)
      setbookData(data)
    }
  }

  const handleBook = (item: BookView) => {
    setBookId(item.id)
    setSearchOpen(false)
    setSearchValue(item.title as string)
  }





  return (
    <ResponsiveNavbar>
      <>
        <Desktop>
          <HomeDesktop
            loading={loading}
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputError={inputError}
            setInputError={setInputError}
            messageError={messageError}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            sort={sort}
            setSort={setSort}
            rentSort={rentSort}
            saleSort={saleSort}
            rent={rent}
            setRent={setRent}
            trade={trade}
            setTrade={setTrade}
            sale={sale}
            setSale={setSale}
            bookData={bookData}
            data={data}
            setCity={setCity}
            setBookId={setBookId}
            page={page}
            setPage={setPage}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            handleSearch={handleSearch}
            handleCep={handleCep}
            handleBook={handleBook}
            announcementsData={announcementsData}
            loadAnnouncements={loadAnnouncements}
            listLoading={listLoading}
          />
        </Desktop>
        <MobileAndTablet>
          <HomeMobile
            loading={loading}
            inputValue={inputValue}
            setInputValue={setInputValue}
            inputError={inputError}
            setInputError={setInputError}
            messageError={messageError}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            sort={sort}
            setSort={setSort}
            rentSort={rentSort}
            saleSort={saleSort}
            rent={rent}
            setRent={setRent}
            trade={trade}
            setTrade={setTrade}
            sale={sale}
            setSale={setSale}
            bookData={bookData}
            data={data}
            setCity={setCity}
            setBookId={setBookId}
            page={page}
            setPage={setPage}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            handleSearch={handleSearch}
            handleCep={handleCep}
            handleBook={handleBook}
            announcementsData={announcementsData}
            loadAnnouncements={loadAnnouncements}
            listLoading={listLoading}
          />
        </MobileAndTablet>
      </>
    </ResponsiveNavbar >
  );
}

