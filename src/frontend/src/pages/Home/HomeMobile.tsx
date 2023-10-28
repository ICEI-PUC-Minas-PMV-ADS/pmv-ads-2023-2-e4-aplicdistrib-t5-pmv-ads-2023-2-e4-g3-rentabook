import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, FlatList, TouchableWithoutFeedback, Modal, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import SearchInput from "../../common/components/SearchInput";
import { DarkGreen, GreenLight, GreyColor, PrimaryGreenColor, WhiteColor } from "../../common/theme/colors";
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView";
import { useMediaQuery } from "../../hooks/useResposive";
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import dropDownData from "../../data/dropDownData.json"
import { avaliableText, getFirstImageLink, getValueRent, getValueSale } from "../../common/utils/annoucementsUtils";
import { getUrlImage } from "../../common/utils/bookUtils";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { PrivateAddress } from "../../types/PrivateAddress";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/StackTypes";
import { HomeProps } from "../../types/HomeProps";
import SearchMobile from "./SearchMobile";
import LocationMobile from "./LocationMobile";

export default function HomeMobile({ loading, inputValue, setInputValue, inputError, setInputError, messageError, selectedAddress, setSelectedAddress, searchValue, setSearchValue, sort, setSort, rentSort, saleSort, rent, setRent, trade, setTrade, sale, setSale, bookData, data, setCity, setBookId, page, setPage, handleSearch, handleCep, handleBook, announcementsData, listLoading, loadAnnouncements, setIsVisible, isVisible }: HomeProps) {

  const navigation = useNavigation<StackTypes>()
  const authContext = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("Mais recente")
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);


  const RenderAddress = ({ item }: { item: PrivateAddress }) => {
    const [isHover, setIsHover] = useState(false)
    return (
      <Pressable onPress={() => setSelectedAddress(item)} onHoverIn={() => setIsHover(true)} onHoverOut={() => setIsHover(false)} style={[isHover && {
        backgroundColor: GreyColor
      }, styles.addressItem]}>
        {
          item.id == selectedAddress?.id &&
          <Ionicons name="radio-button-on" size={20} color={PrimaryGreenColor} />
        }
        {
          item.id != selectedAddress?.id &&
          <Ionicons name="radio-button-off" size={20} color={PrimaryGreenColor} />
        }
        <View>
          <Text>{item?.street}</Text>
          <Text>CEP:{item?.cep} - {item?.city}, {item?.state}</Text>
        </View>
      </Pressable>
    )
  }


  const renderItem = (item: CleanAnnouncementView) => {
    return (
      <>
        {data != null &&
          <Pressable key={item.id} style={styles.card} onPress={() => navigation.navigate('Detalhes do anúncio', { announcement: item })}>
            <Image source={getFirstImageLink(item)} style={styles.image} />
            <Text style={styles.cardTitle}>
              {item.book.title}
            </Text>
            <View style={styles.available}>
              <Ionicons name="checkmark-circle" size={20} style={{ color: PrimaryGreenColor }} />
              <Text style={styles.availableText}>{avaliableText(item)}</Text>
            </View>
            {
              item.rent &&
              <View style={styles.price}>
                <Text style={styles.priceTitle}>Alugar</Text>
                <Text style={styles.priceText}>{getValueRent(item)}</Text>
              </View>
            }
            {
              item.sale &&
              <View style={styles.price}>
                <Text style={styles.priceTitle}>Comprar</Text>
                <Text style={styles.priceText}>{getValueSale(item)}</Text>
              </View>
            }
          </Pressable>
        }
      </>
    )
  }

  const renderLongItem = (item: CleanAnnouncementView) => {
    return (
      <>
        {data != null &&
          <Pressable key={item.id} style={styles.longCard} onPress={() => navigation.navigate('Detalhes do anúncio', { announcement: item })}>
            <Image source={getFirstImageLink(item)} style={styles.smallImage} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                <Text style={styles.longCardTitle}>
                  {item.book.title && item.book.title.length > 43 ? item.book.title.slice(0, 42) + "..." : item.book.title}
                </Text>
              </View>
              <View style={styles.availableLong}>
                <Ionicons name="checkmark-circle" size={20} style={{ color: PrimaryGreenColor }} />
                <Text style={styles.availableText}>{avaliableText(item)}</Text>
              </View>
              {
                item.rent &&
                <View style={styles.price}>
                  <Text style={styles.priceTitle}>Alugar</Text>
                  <Text style={styles.priceTextLong}>{getValueRent(item)}</Text>
                </View>
              }
              {
                item.sale &&
                <View style={styles.price}>
                  <Text style={styles.priceTitle}>Comprar</Text>
                  <Text style={styles.priceTextLong}>{getValueSale(item)}</Text>
                </View>
              }
            </View>
          </Pressable>
        }
      </>
    )
  }

  const Header = () => {
    return (
      <View>
        <View style={styles.topBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <SearchInput value={searchValue}
              style={{ width: '95%' }}
              onFocus={() => { setSearchOpen(true) }} />
            {
              searchValue != "" &&
              <Pressable onPress={() => {
                setSearchValue("")
                setBookId(null)
                setSearchOpen(false)
              }}>
                <Ionicons name='close' size={35} color={DarkGreen} />
              </Pressable>
            }
          </View>
          <Pressable onPress={() => setIsVisible(true)} style={styles.locationContainer}>
            <Ionicons name='location' size={18} color={DarkGreen} />
            <Text style={styles.locationText}>{authContext.defaultAddress == null ? "Selecionar localização" : authContext.defaultAddress.city}</Text>
            <Ionicons name='chevron-forward' size={18} color={DarkGreen} />
          </Pressable>
        </View>
        <Pressable onPress={() => setFilterVisible(true)} style={styles.filterContainer}>
          <View>
            <Text style={styles.filterContainerText}>{data?.totalElements} resultados</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.filterContainerText}>Filtros</Text>
            <Ionicons name='chevron-forward' size={18} color={WhiteColor} />
          </View>
        </Pressable>
      </View>
    )
  }

  const loaderFooter = () => {
    if (listLoading == false) return <></>
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color={PrimaryGreenColor} />
      </View>
    )
  }

  const cleanFilters = () => {
    setRent(false)
    setSale(false)
    setTrade(false)
    setPage(0)
    setSort(dropDownData[0].value)
    setSelectedSort(dropDownData[0].label)
  }

  return (
    <>
      {
        searchOpen &&
        <SearchMobile setSearchOpen={setSearchOpen}
          bookData={bookData}
          setSearchValue={setSearchValue}
          handleBook={handleBook}
          handleSearch={handleSearch}
          setBookId={setBookId}
          searchValue={searchValue}
        />
      }
      {
        isVisible &&
        <LocationMobile
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          inputError={inputError}
          setIsVisible={setIsVisible}
          setInputValue={setInputValue}
          setInputError={setInputError}
          messageError={messageError}
          inputValue={inputValue}
          handleCep={handleCep}
        />
      }
      <SafeAreaView style={styles.container}>
        {loading &&
          <View style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 30,
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator size="large" color={GreenLight} />
          </View>
        }
        <Modal transparent={true} onRequestClose={() => setFilterVisible(false)} visible={filterVisible}>
          <TouchableWithoutFeedback onPress={() => setFilterVisible(false)} style={{ flex: 1, width: '100%', height: '100%', }}>
            <SafeAreaView style={styles.modalView}>
              <Pressable style={styles.modalWindow}>
                {loading &&
                  <View style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 30,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ActivityIndicator size="large" color={GreenLight} />
                  </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 25 }}>
                  <Text style={styles.modalTitle}>Filtrar por:</Text>
                  <Text onPress={() => cleanFilters()} style={styles.greenText}>Limpar filtros</Text>
                </View>
                <ScrollView>
                  <Pressable>
                    <Pressable onPress={() => setOpen(!open)} style={styles.dropDownSelectedItem}>
                      <View>
                        <Text>Ordenar por:</Text>
                        <Text style={styles.greenText}>
                          {selectedSort}
                        </Text>
                      </View>
                      <Ionicons name={open == true ? 'chevron-up' : 'chevron-down'} size={25} color={PrimaryGreenColor} />
                    </Pressable>

                    {
                      open == true &&
                      <>

                        <Pressable onPress={() => {
                          setSelectedSort(dropDownData[0].label)
                          setSort(dropDownData[0].value)
                          setOpen(false)
                        }
                        } style={styles.dropDownItem}>
                          <Text >
                            {dropDownData[0].label}
                          </Text>
                          <Ionicons name={dropDownData[0].value == sort ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                        </Pressable>

                        <Pressable onPress={() => {
                          setSelectedSort(dropDownData[1].label)
                          setSort(dropDownData[1].value)
                          setOpen(false)
                        }
                        } style={styles.dropDownItem}>
                          <Text >
                            {dropDownData[1].label}
                          </Text>
                          <Ionicons name={dropDownData[1].value == sort ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                        </Pressable>
                        {
                          rentSort &&
                          <>
                            <Pressable onPress={() => {
                              setSelectedSort(dropDownData[2].label)
                              setSort(dropDownData[2].value)
                              setOpen(false)
                            }
                            } style={styles.dropDownItem}>
                              <Text >
                                {dropDownData[2].label}
                              </Text>
                              <Ionicons name={dropDownData[2].value == sort ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                            </Pressable>

                            <Pressable onPress={() => {
                              setSelectedSort(dropDownData[3].label)
                              setSort(dropDownData[3].value)
                              setOpen(false)
                            }
                            } style={styles.dropDownItem}>
                              <Text >
                                {dropDownData[3].label}
                              </Text>
                              <Ionicons name={dropDownData[3].value == sort ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                            </Pressable>
                          </>
                        }
                        {
                          saleSort &&
                          <>
                            <Pressable onPress={() => {
                              setSelectedSort(dropDownData[4].label)
                              setSort(dropDownData[4].value)
                              setOpen(false)
                            }
                            } style={styles.dropDownItem}>
                              <Text >
                                {dropDownData[4].label}
                              </Text>
                              <Ionicons name={dropDownData[4].value == sort ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                            </Pressable>

                            <Pressable onPress={() => {
                              setSelectedSort(dropDownData[5].label)
                              setSort(dropDownData[5].value)
                              setOpen(false)
                            }
                            } style={styles.dropDownItem}>
                              <Text >
                                {dropDownData[5].label}
                              </Text>
                              <Ionicons name={dropDownData[5].value == sort ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                            </Pressable>
                          </>
                        }
                      </>
                    }
                    <Pressable onPress={() => setSale(!sale)} style={styles.dropDownSelectedItem}>
                      <View>
                        <Text style={styles.greenText}>
                          Disponível para compra
                        </Text>
                      </View>
                      <Ionicons name={sale == true ? 'checkbox' : 'square-outline'} size={25} color={PrimaryGreenColor} />
                    </Pressable>
                    <Pressable onPress={() => setRent(!rent)} style={styles.dropDownSelectedItem}>
                      <View>
                        <Text style={styles.greenText}>
                          Disponível para aluguel
                        </Text>
                      </View>
                      <Ionicons name={rent == true ? 'checkbox' : 'square-outline'} size={25} color={PrimaryGreenColor} />
                    </Pressable>
                    <Pressable onPress={() => setTrade(!trade)} style={styles.dropDownSelectedItem}>
                      <View>
                        <Text style={styles.greenText}>
                          Disponível para troca
                        </Text>
                      </View>
                      <Ionicons name={trade == true ? 'checkbox' : 'square-outline'} size={25} color={PrimaryGreenColor} />
                    </Pressable>
                  </Pressable>
                </ScrollView>
              </Pressable>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </Modal>

        {
          useMediaQuery(0, 700) &&
          <FlatList
            data={announcementsData}
            numColumns={1}
            style={{ width: '100%' }}
            renderItem={({ item }) => renderLongItem(item)}
            onEndReached={loadAnnouncements}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => loaderFooter()}
            ListHeaderComponent={() => Header()}
          />
        }
        {
          useMediaQuery(700, 1000) &&
          <>
            <Header />
            <View style={styles.infosContainer}>
              <FlatList nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                data={announcementsData}
                numColumns={2}
                style={{ padding: 20 }}
                renderItem={({ item }) => renderItem(item)}
                onEndReached={loadAnnouncements}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => loaderFooter()}
              />
            </View>
          </>
        }

      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1
  },
  topBar: {
    backgroundColor: GreenLight,
    paddingBottom: 20,
    paddingTop: 30,
    width: '100%',
    height: 145,
    paddingHorizontal: 20, gap: 20
  },
  filterContainer: {
    height: 40,
    backgroundColor: DarkGreen,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  filterContainerText: {
    color: WhiteColor,
    fontSize: 16
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  infosContainer: {
    flex: 1,
    alignItems: 'center'
  },
  locationText: {
    color: DarkGreen,
    fontSize: 16
  },
  card: {
    width: 300,
    height: 450,
    backgroundColor: WhiteColor,
    marginRight: 40,
    marginBottom: 40,
    gap: 10
  },
  longCard: {
    width: '100%',
    height: 210,
    backgroundColor: WhiteColor,
    gap: 10,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: GreenLight,
    alignItems: 'center'
  },
  image: {
    width: '90%',
    height: '50%',
    alignSelf: 'center', marginTop: 15
  },
  smallImage: {
    width: 150,
    height: 150
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: 18,
  },
  longCardTitle: {
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 15
  },
  availableLong: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
    marginBottom: 15
  },
  available: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center'
  },
  availableText: {
    fontSize: 11,
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
  priceTextLong: {
    fontSize: 18,
    color: PrimaryGreenColor
  },
  modalView: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    zIndex: 20

  },
  modalWindow: {
    width: '70%',
    height: '100%',
    backgroundColor: WhiteColor,
    borderRadius: 3,
    position: 'absolute',
    flexDirection: 'column',
    gap: 15
  },
  modalTitle: {
    fontSize: 20
  },
  addressItem: {
    padding: 10,
    gap: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  dropDownItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgb(211, 211, 211)',
    paddingHorizontal: 15,
    backgroundColor: '#ececec'
  },
  dropDownSelectedItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgb(211, 211, 211)',
    paddingHorizontal: 15
  },
  greenText: {
    color: PrimaryGreenColor
  }

});