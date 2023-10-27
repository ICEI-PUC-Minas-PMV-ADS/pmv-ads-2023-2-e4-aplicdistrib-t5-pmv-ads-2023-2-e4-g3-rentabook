import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, FlatList, TouchableWithoutFeedback, Modal, ScrollView, ActivityIndicator, } from "react-native";
import SearchInput from "../../common/components/SearchInput";
import { Picker } from '@react-native-picker/picker';
import PrimaryButton from "../../common/components/PrimaryButton";
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
import Input from "../../common/components/Input";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/StackTypes";
import { HomeProps } from "../../types/HomeProps";

export default function HomeDesktop({ loading, inputValue, setInputValue, inputError, setInputError, messageError, selectedAddress, setSelectedAddress, isVisible, setIsVisible, searchValue, setSearchValue, sort, setSort, rentSort, saleSort, rent, setRent, trade, setTrade, sale, setSale, bookData, data, setCity, setBookId, page, setPage, searchOpen, setSearchOpen, handleSearch, handleCep, handleBook, announcementsData, loadAnnouncements, listLoading }: HomeProps) {

  const navigation = useNavigation<StackTypes>()
  const authContext = useContext(AuthContext)


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
        <View style={styles.addressDescription}>
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

  const loaderFooter = () => {
    if (listLoading == false) return <></>
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color={PrimaryGreenColor} />
      </View>
    )
  }

  return (
    <>
      {
        loading == true &&
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 21,
          width: '100%',
          top: 84,
          height: '88.6%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color={GreenLight} />
        </View>
      }
      <Modal transparent={true} onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)} style={{ flex: 1, width: '100%', height: '100%', }}>
          <View style={styles.modalView}>
            <Pressable style={styles.modalWindow}>
              <View>
                <Text style={styles.modalTitle}>Selecione o seu endereço</Text>
                <Text>Você poderá ver os anúncios mais pertos de você</Text>
              </View>
              {
                authContext.user &&
                <View>
                  <Text style={styles.modalTitle}>Em um dos seus endereços</Text>
                  <ScrollView style={styles.modalScroll}>
                    <FlatList data={authContext.user?.addresses} renderItem={({ item }) => {
                      if (item) {
                        return (<RenderAddress item={item} />)
                      }
                      else return <></>
                    }
                    } />
                  </ScrollView>
                </View>
              }
              <View>
                {
                  authContext.user != null &&
                  <Text style={styles.modalTitle}>Em outro lugar</Text>
                }
                <View style={styles.modalInputContainer}>
                  <View style={{ width: '50%' }}>
                    <Input
                      error={inputError}
                      label="Código de Endereçamento Postal"
                      style={{ width: '100%' }}
                      onChangeText={(value) => {
                        setInputValue(value)
                        setInputError(false)
                      }}
                      messageError={messageError}
                      value={inputValue} />
                  </View>
                  <View style={{ marginLeft: 15, flex: 1, alignItems: 'baseline', justifyContent: 'center', flexDirection: 'column' }}>
                    <PrimaryButton
                      style={{ width: 100 }}
                      activeStyle={true}
                      onPress={() => handleCep()}
                      label='Usar'
                    />
                  </View>

                </View>
              </View>


              <View style={styles.buttomContainerModal}>
                {
                  authContext.defaultAddress != null &&
                  <View style={styles.buttomContainerModal}>
                    <PrimaryButton
                      style={{ width: 180 }}
                      activeStyle={false}
                      onPress={() => {
                        authContext.removeDefaultAddress()
                        setIsVisible(false)
                      }}
                      label='Limpar'
                    />
                  </View>
                }
                {
                  authContext.user &&
                  <>
                    <PrimaryButton
                      style={{ width: 180 }}
                      activeStyle={false}
                      onPress={() => setIsVisible(false)}
                      label='Cancelar'
                    />
                    <PrimaryButton
                      style={{ width: 180 }}
                      activeStyle={true}
                      onPress={() => {
                        if (selectedAddress) {
                          authContext.setDefaultAddressLocalStorage(selectedAddress)
                          setIsVisible(false)
                        }
                      }}
                      label='Salvar alterações'
                    />
                  </>
                }
              </View>

            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableWithoutFeedback onPress={() => setSearchOpen(false)}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Pressable
              style={styles.searchContainer}>
              <SearchInput
                placeholder="Pesquisar por livro..."
                style={styles.searchBar}
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
                        style={styles.searchItem}>
                        <Image source={getUrlImage(item)} style={styles.bookImage} />
                        <View style={styles.bookTexts}>
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
              <View style={styles.dropDownContainer}>
                <Picker
                  style={styles.dropDown}
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
            <View style={styles.leftBar}>
              <View style={styles.buttonsContainer}>
                <Pressable onPress={() => setIsVisible(true)} style={styles.addressButtom}>
                  <View>
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Localização</Text>
                    <Text>{authContext.defaultAddress == null ? "Selecionar localização" : authContext.defaultAddress.city}</Text>
                  </View>
                </Pressable>
                <Text style={{ fontSize: 18 }}>Filtrar por:</Text>
                <PrimaryButton
                  style={{}}
                  activeStyle={sale}
                  onPress={() => setSale(!sale)}
                  label='Disponível para compra'
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
            <>
              {
                announcementsData.length == 0 &&
                <View style={[styles.addsContainer, { alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={styles.modalTitle}>Nenhum anúncio encontrado para a sua cidade ou para os filtros selecionados</Text>
                  <PrimaryButton
                    style={{ width: 180, marginTop: 20 }}
                    activeStyle={true}
                    onPress={() => {
                      authContext.removeDefaultAddress()
                      setBookId(null)
                      setCity(null)
                      setRent(false)
                      setSale(false)
                      setTrade(false)
                      setPage(0)
                      setSort(dropDownData[0].value)
                    }}
                    label='Limpar filtros'
                  />
                </View>
              }
              <View style={styles.addsContainer}>
                {
                  useMediaQuery(1025, 1300) &&
                  <FlatList
                    data={announcementsData}
                    numColumns={2}
                    renderItem={({ item }) => renderItem(item)}
                    onEndReached={loadAnnouncements}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => loaderFooter()} />
                }
                {
                  !useMediaQuery(1025, 1300) &&
                  <FlatList
                    data={announcementsData}
                    numColumns={3}
                    renderItem={({ item }) => renderItem(item)}
                    onEndReached={loadAnnouncements}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => loaderFooter()} />
                }
              </View>
            </>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
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
    width: 220,
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
    marginTop: 20,
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
    backgroundColor: WhiteColor,
    borderRadius: 3,
    position: 'absolute',
    padding: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15
  },
  buttomContainerModal: {
    flexDirection: 'row', justifyContent: 'flex-end', gap: 10
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
  addressDescription: {

  },
  modalInputContainer: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3'
  },
  modalScroll: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    height: 150
  }

});