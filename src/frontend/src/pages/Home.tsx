import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, FlatList, TouchableWithoutFeedback, Modal, Button } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import SearchInput from "../common/components/SearchInput";
import { Picker } from '@react-native-picker/picker';
import PrimaryButton from "../common/components/PrimaryButton";
import { BlackColor, DarkGreen, GreyColor, PrimaryGreenColor, WhiteColor } from "../common/theme/colors";
import { Desktop } from "../hooks/useResposive";
import { announcementsService } from "../services/announcementsService";
import { Page } from "../types/Page";
import { CleanAnnouncementView } from "../types/CleanAnnouncementView";
import { useMediaQuery } from "../hooks/useResposive";
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import dropDownData from "../data/dropDownData.json"
import { avaliableText, getFirstImageLink, getValueRent, getValueSale } from "../common/utils/annoucementsUtils";
import { bookService } from "../services/bookService";
import { BookView } from "../types/BookView";
import { getUrlImage } from "../common/utils/bookUtils";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [modelOpen, setModalOpen] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [sort, setSort] = useState(dropDownData[0].value);
  const [rentSort, setRentSort] = useState(true)
  const [saleSort, setSaleSort] = useState(true)
  const [rent, setRent] = useState(false);
  const [trade, setTrade] = useState(false);
  const [sale, setSale] = useState(false);
  const [bookData, setbookData] = useState<Page<BookView> | null>(null)
  const [data, setData] = useState<Page<CleanAnnouncementView> | null>(null)
  const [city, setCity] = useState(null)
  const [bookId, setBookId] = useState<null | string>(null)
  const [page, setPage] = useState(null)
  const rentOption = rent ? true : null
  const tradeOption = trade ? true : null
  const saleOption = sale ? true : null
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const announcements = async () => {
      const adds = await announcementsService.getAnnouncements(city, bookId, rentOption, tradeOption, saleOption, sort, page)
      setData(adds)
    }
    //announcements()
  }, [city, bookId, rentOption, tradeOption, saleOption, page, sort])

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

  const renderItem = (item: CleanAnnouncementView) => {
    return (
      <Pressable key={item.id} style={styleDesktop.card}>
        <Image source={getFirstImageLink(item)} style={styleDesktop.image} />
        <Text style={styleDesktop.cardTitle}>
          {item.book.title}
        </Text>
        <View style={styleDesktop.available}>
          <Ionicons name="checkmark-circle" size={20} style={{ color: PrimaryGreenColor }} />
          <Text style={styleDesktop.availableText}>{avaliableText(item)}</Text>
        </View>
        {
          item.rent &&
          <View style={styleDesktop.price}>
            <Text style={styleDesktop.priceTitle}>Alugar</Text>
            <Text style={styleDesktop.priceText}>{getValueRent(item)}</Text>
          </View>
        }
        {
          item.sale &&
          <View style={styleDesktop.price}>
            <Text style={styleDesktop.priceTitle}>Comprar</Text>
            <Text style={styleDesktop.priceText}>{getValueSale(item)}</Text>
          </View>
        }
      </Pressable>
    )
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
      <Desktop>
        <>
          <Modal transparent={true} onRequestClose={() => setIsVisible(false)} visible={isVisible}>
            <View style={styleDesktop.modalView}>
              <View style={styleDesktop.modalWindow}>
                <Text>Hello, World!</Text>
                <Button onPress={() => setIsVisible(false)} title={'Close'} />
              </View>
            </View>
          </Modal>
          <TouchableWithoutFeedback onPress={() => setSearchOpen(false)}>
            <View style={styleDesktop.container}>
              <View style={styleDesktop.topBar}>
                <Pressable
                  style={styleDesktop.searchContainer}>
                  <SearchInput
                    placeholder="Pesquisar por livro..."
                    style={styleDesktop.searchBar}
                    onChange={(value) => {
                      setBookId(null)
                      setSearchValue(value)
                    }}
                    onFocus={() => {
                      setSearchOpen(true)
                    }}
                    value={searchValue}
                    onChangeDebounce={(value) => {
                      handleSearch(value)
                    }}
                  />
                  {
                    searchOpen &&
                    <Pressable onPress={() => setSearchOpen(false)} style={{
                      width: 450,
                      height: 450,
                      backgroundColor: GreyColor,
                      borderRadius: 3,
                      shadowColor: '#171717',
                      shadowOffset: { width: 2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      position: 'absolute',
                      paddingTop: 60,

                    }}>
                      <FlatList
                        data={bookData?.content}
                        keyExtractor={item => Math.random().toString()}
                        numColumns={1}
                        renderItem={({ item }) => (
                          <Pressable
                            onPress={() => handleBook(item)}
                            style={styleDesktop.searchItem}>
                            <Image source={getUrlImage(item)} style={styleDesktop.bookImage} />
                            <View style={styleDesktop.bookTexts}>
                              <Text style={{ fontSize: 16 }}>{item.title?.slice(0, 35)}</Text>
                              <Text>{item.authors == null ? "Autor desconhecido" : item.authors[0]?.slice(0, 35)}</Text>
                              <Text>{item.publishedDate}</Text>
                            </View>
                          </Pressable>
                        )}
                      />
                    </Pressable>
                  }
                </Pressable>
                <TouchableWithoutFeedback onPress={() => setSearchOpen(false)}>
                  <View style={styleDesktop.dropDownContainer}>
                    <Picker
                      style={styleDesktop.dropDown}
                      selectedValue={sort}
                      onValueChange={(itemValue, itemIndex) =>
                        setSort(itemValue)
                      }>
                      <Picker.Item
                        label={dropDownData[0].label} value={dropDownData[0].value} />
                      <Picker.Item
                        label={dropDownData[1].label} value={dropDownData[1].value} />
                      {
                        rentSort &&
                        <>
                          <Picker.Item
                            label={dropDownData[2].label} value={dropDownData[2].value} />
                          <Picker.Item
                            label={dropDownData[3].label} value={dropDownData[3].value} />
                        </>
                      }
                      {
                        saleSort &&
                        <Picker.Item
                          label={dropDownData[4].label} value={dropDownData[4].value} />
                      }
                      {
                        saleSort &&
                        <Picker.Item
                          label={dropDownData[5].label} value={dropDownData[5].value} />
                      }
                    </Picker>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback onPress={() => setSearchOpen(false)}>
                <View style={styleDesktop.leftBar}>
                  <View style={styleDesktop.buttonsContainer}>
                    <Pressable onPress={() => setIsVisible(true)} style={styleDesktop.addressButtom}>
                      <View>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>Localização</Text>
                        <Text>Meu endereço</Text>
                      </View>
                    </Pressable>
                    <Text style={{ fontSize: 18 }}>Filtrar por:</Text>
                    <PrimaryButton
                      style={{}}
                      activeStyle={sale}
                      onPress={() => setSale(!sale)}
                      label='Disponível para venda'
                    />
                    <PrimaryButton
                      style={{}}
                      activeStyle={rent}
                      onPress={() => setRent(!rent)}
                      label='Disponível para aluguel'
                    />
                    <PrimaryButton
                      style={{}}
                      activeStyle={trade}
                      onPress={() => setTrade(!trade)}
                      label='Disponível para troca'
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setSearchOpen(false)}>
                <View style={styleDesktop.addsContainer}>
                  {
                    useMediaQuery(1025, 1300) &&
                    <FlatList
                      data={data?.content}
                      numColumns={2}
                      renderItem={({ item }) => renderItem(item)} />
                  }
                  {
                    !useMediaQuery(1025, 1300) &&
                    <FlatList
                      data={data?.content}
                      numColumns={3}
                      renderItem={({ item }) => renderItem(item)} />
                  }
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </>
      </Desktop>
    </ResponsiveNavbar >
  );
}

const styleDesktop = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1
  },
  topBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: '70%',
    marginTop: 40,
    marginRight: 40,
    zIndex: 10
  },
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 450
  },
  dropDownContainer: {
    width: 180,
  },
  searchBar: {
    flex: 1,
    width: '100%',
    zIndex: 5
  },
  dropDown: {
    borderWidth: 0,
    borderRadius: 3,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 8
  },
  buttonsContainer: {
    width: 210,
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 20
  },
  leftBar: {
    position: 'absolute',
    left: 40,
    top: 40
  },
  addressButtom: {
    borderRadius: 50,
    backgroundColor: WhiteColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: PrimaryGreenColor,
  },
  addsContainer: {
    alignSelf: 'flex-end',
    width: '72.5%',
    marginTop: 40,
    flex: 1
  },
  card: {
    width: 300,
    height: 450,
    backgroundColor: WhiteColor,
    marginRight: 40,
    marginBottom: 40,
    gap: 10

  },
  image: {
    width: '90%',
    height: '50%',
    alignSelf: 'center', marginTop: 15
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: 18,
  },
  available: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center'
  },
  availableText: {
    marginLeft: 5
  },
  price: {
    marginLeft: 15,
  },
  priceTitle: {
    fontSize: 14
  },
  priceText: {
    fontSize: 25,
    color: DarkGreen
  },
  bookImage: {
    height: '100%',
    width: '20%',
    borderRadius: 5
  },
  searchItem: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    padding: 5
  },
  bookTexts: {
    marginLeft: 10,
    flexDirection: 'column',
    gap: 5,
    alignSelf: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20

  },
  modalWindow: {
    width: '50%',
    height: '70%',
    backgroundColor: WhiteColor,
    borderRadius: 3,
    position: 'absolute',


  }

});