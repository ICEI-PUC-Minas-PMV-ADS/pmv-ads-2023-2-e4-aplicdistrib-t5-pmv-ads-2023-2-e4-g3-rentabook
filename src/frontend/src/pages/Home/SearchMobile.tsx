import { useContext } from 'react'
import { View, Pressable, Text, StyleSheet, ActivityIndicator, SafeAreaView, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DarkGreen, GreyColor, GreenLight } from "../../common/theme/colors";
import SearchInput from "../../common/components/SearchInput";
import { Image } from "expo-image";
import { getUrlImage } from "../../common/utils/bookUtils";
import { HomeContext } from "../../contexts/Home/HomeContext";

export default function SearchMobile() {

  const { inputSearchValue, setInputSearchValue, bookResponse, setBookIdForSearch, setSearchModalIsVisible, handleSearch, handleBook, loadingBooks } = useContext(HomeContext)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => setSearchModalIsVisible(false)}>
          <Ionicons name='arrow-back' size={35} color={DarkGreen} />
        </Pressable>
        <SearchInput
          style={{ flex: 1 }}
          iconActive={false}
          placeholder="Pesquisar por livro..."
          onChange={(value) => {

            setInputSearchValue(value)
          }}
          value={inputSearchValue}
          onChangeDebounce={(value) => {
            handleSearch(value)
          }}
        />
        {
          inputSearchValue != "" &&
          <Pressable onPress={() => {
            setInputSearchValue("")
            setBookIdForSearch(null)
            setSearchModalIsVisible(false)
          }}>
            <Ionicons name='close' size={35} color={DarkGreen} />
          </Pressable>
        }
      </View>
      <View style={{ flex: 1 }}>
        {loadingBooks == true &&
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
        <FlatList
          data={bookResponse?.content}
          keyExtractor={item => Math.random().toString()}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                handleBook(item)
                setSearchModalIsVisible(false)
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
      </View>
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