import { View, Pressable, Text, StyleSheet, TextInput, SafeAreaView, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DarkGreen, GreyColor } from "../../common/theme/colors";
import { BookView } from "../../types/BookView";
import { Page } from "../../types/Page";
import SearchInput from "../../common/components/SearchInput";
import { Image } from "expo-image";
import { getUrlImage } from "../../common/utils/bookUtils";

export default function SearchMobile({ setSearchOpen, bookData, setBookId, setSearchValue, searchValue, handleSearch, handleBook }: {
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>,
  bookData: Page<BookView> | null,
  setBookId: React.Dispatch<React.SetStateAction<string | null>>,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  searchValue: string,
  handleSearch: (value: string) => Promise<void>,
  handleBook: (item: BookView) => void

}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => setSearchOpen(false)}>
          <Ionicons name='arrow-back' size={35} color={DarkGreen} />
        </Pressable>
        <SearchInput
          style={{ flex: 1 }}
          iconActive={false}
          placeholder="Pesquisar por livro..."
          onChange={(value) => {

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
      <FlatList
        data={bookData?.content}
        keyExtractor={item => Math.random().toString()}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleBook(item)
              setSearchOpen(false)
            }}
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
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1,
    position: 'absolute',
    zIndex: 25,
    width: '100%',
    height: '100%'
  },
  topBar: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: GreyColor,
    padding: 10
  },
  bookTexts: {
    marginLeft: 10,
    flexDirection: 'column',
    gap: 5,
    alignSelf: 'center'
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
  }
});