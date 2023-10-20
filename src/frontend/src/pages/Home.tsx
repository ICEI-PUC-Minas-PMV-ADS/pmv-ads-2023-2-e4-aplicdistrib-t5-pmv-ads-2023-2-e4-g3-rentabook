import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/Navbar";
import SearchInput from "../common/components/SearchInput";
import Dropdown from "../common/components/Dropdown";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DarkGreen } from "../common/theme/colors";

const dropDownData = [
  {
    id: 1,
    label: 'Mais recente',
    param: '&sort=createdDate,desc'
  },
  {
    id: 2,
    label: 'Mais antigo',
    param: '&sort=createdDate,asc'
  },
  {
    id: 3,
    label: 'Menor Preço',
    param: '&sort=value,asc'
  },
  {
    id: 4,
    label: 'Maior Preço',
    param: '&sort=value,desc'
  },
]

const styleDesktop = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1
  },
  topBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: '65%',
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
    marginLeft: 10
  },
  dropDown: {
    width: 200
  },

});

export default function Home() {
  return (
    <NavBar>
      <View style={styleDesktop.container}>
        <View style={styleDesktop.topBar}>
          <View style={styleDesktop.searchContainer}>
            <Ionicons name="search" size={35} color={DarkGreen} />
            <SearchInput style={styleDesktop.searchBar} />
          </View>
          <View style={styleDesktop.dropDownContainer}>
            <Dropdown
              placeholder="Ordenar por"
              style={styleDesktop.dropDown}
              items={[{ id: 1, name: "pedro" }, { id: 2, name: "carlos" }, { id: 3, name: "maria" }]} onSelect={(val) => { console.log(val.name) }}>
              {(val) => <Text style={{ backgroundColor: "white" }}>{val.name}</Text>}
            </Dropdown>
          </View>
        </View>

      </View>
    </NavBar>

  );
}
