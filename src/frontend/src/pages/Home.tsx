import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView, FlatList, ImageSourcePropType } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import SearchInput from "../common/components/SearchInput";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../common/components/PrimaryButton";
import { PrimaryGreenColor, WhiteColor } from "../common/theme/colors";
import { Desktop } from "../hooks/useResposive";
import { announcementsService } from "../services/announcementsService";
import { Page } from "../types/Page";
import { CleanAnnouncementView } from "../types/CleanAnnouncementView";
import { useMediaQuery } from "../hooks/useResposive";

const image: ImageSourcePropType = require("../common/assets/image.jpg");

const dropDownData = [
  {
    id: 1,
    label: 'Mais recente',
    value: '&sort=createdDate&direction=DESC'
  },
  {
    id: 2,
    label: 'Mais antigo',
    value: '&sort=createdDate&direction=ASC'
  },
  {
    id: 3,
    label: 'Menor Preço',
    value: '&sort=value&direction=ASC'
  },
  {
    id: 4,
    label: 'Maior Preço',
    value: '&sort=value&direction=DESC'
  },
]

const content = [
  {
    "id": 1,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  },
  {
    "id": 2,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  },
  {
    "id": 3,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  },
  {
    "id": 4,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  },
  {
    "id": 5,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  },
  {
    "id": 6,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  },
  {
    "id": 7,
    "book": {
      "title": "Branca de neve"
    },
    "images": image,
    "rent": true,
    "sale": false,
    "trade": true,
  }
]



export default function Home() {
  const [open, setOpen] = useState(false);

  const [sort, setSort] = useState(null);
  const [rent, setRent] = useState(false);
  const [trade, setTrade] = useState(false);
  const [sale, setSale] = useState(false);
  const [data, setData] = useState<Page<CleanAnnouncementView> | null>(null)
  const [city, setCity] = useState(null)
  const [bookId, setBookId] = useState(null)
  const [page, setPage] = useState(null)
  const rentOption = rent ? true : null
  const tradeOption = trade ? true : null
  const saleOption = sale ? true : null

  useEffect(() => {
    const announcements = async () => {
      const adds = await announcementsService.getAnnouncements(city, bookId, rentOption, tradeOption, saleOption, sort, page)
      setData(adds)
    }
    //announcements()
  }, [city, bookId, rentOption, tradeOption, saleOption, sort, page])

  return (
    <ResponsiveNavbar>
      <Desktop>
        <View style={styleDesktop.container}>
          <View style={styleDesktop.topBar}>
            <View style={styleDesktop.searchContainer}>
              <SearchInput
                placeholder="Pesquisar por livro..."
                style={styleDesktop.searchBar} />
            </View>
            <View style={styleDesktop.dropDownContainer}>
              <DropDownPicker
                style={styleDesktop.dropDown}
                placeholderStyle={{ fontSize: 16, color: '#777777' }}
                textStyle={{ fontSize: 16 }}
                listItemContainerStyle={{ borderWidth: 0 }}
                placeholder="Ordenar por"
                open={open}
                value={sort}
                items={dropDownData}
                setOpen={setOpen}
                setValue={setSort}
              />
            </View>
          </View>
          <View style={styleDesktop.leftBar}>
            <View style={styleDesktop.buttonsContainer}>
              <Pressable style={styleDesktop.addressButtom}>
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
          <View style={styleDesktop.addsContainer}>
            {
              useMediaQuery(1025, 1300) &&
              <FlatList
                data={content}
                numColumns={2}
                renderItem={({ item }) => (
                  <Pressable key={item.id} style={styleDesktop.card}>
                    <Text>
                      {item.book.title}
                    </Text>
                  </Pressable>
                )} />
            }
            {
              !useMediaQuery(1025, 1300) &&
              <FlatList
                data={content}
                numColumns={3}
                renderItem={({ item }) => (
                  <Pressable key={item.id} style={styleDesktop.card}>
                    <Text>
                      {item.book.title}
                    </Text>
                  </Pressable>
                )} />
            }
          </View>
        </View>
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
    marginRight: 40
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 450
  },
  dropDownContainer: {

  },
  searchBar: {
    flex: 1,
  },
  dropDown: {
    width: 200,
    borderWidth: 0,
    borderRadius: 3
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
    height: 350,
    backgroundColor: WhiteColor,
    marginRight: 40,
    marginBottom: 40
  }
});