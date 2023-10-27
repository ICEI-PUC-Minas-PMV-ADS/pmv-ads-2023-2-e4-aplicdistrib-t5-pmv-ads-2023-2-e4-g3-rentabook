import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, FlatList, TouchableWithoutFeedback, Modal, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
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
import { lightGreen } from "@mui/material/colors";

export default function HomeMobile({ loading, inputValue, setInputValue, inputError, setInputError, messageError, selectedAddress, setSelectedAddress, isVisible, setIsVisible, searchValue, setSearchValue, sort, setSort, rentSort, saleSort, rent, setRent, trade, setTrade, sale, setSale, bookData, data, setCity, setBookId, page, setPage, searchOpen, setSearchOpen, handleSearch, handleCep, handleBook, announcementsData, listLoading, loadAnnouncements }: HomeProps) {

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
          <SearchInput />
          <Pressable style={styles.locationContainer}>
            <Ionicons name='location' size={18} color={DarkGreen} />
            <Text style={styles.locationText}>{authContext.defaultAddress == null ? "Selecionar localização" : authContext.defaultAddress.city}</Text>
            <Ionicons name='chevron-forward' size={18} color={DarkGreen} />
          </Pressable>
        </View>
        <Pressable style={styles.filterContainer}>
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

  return (
    <SafeAreaView style={styles.container}>

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
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1
  },
  topBar: {
    backgroundColor: GreenLight,
    paddingVertical: 20,
    width: '100%',
    height: 130,
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
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 450
  },
  locationText: {
    color: DarkGreen,
    fontSize: 16
  },
  dropDownContainer: {
    width: 180,
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