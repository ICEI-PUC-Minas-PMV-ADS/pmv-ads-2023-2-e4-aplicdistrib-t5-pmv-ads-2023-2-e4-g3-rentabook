import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import SearchInput from "../common/components/SearchInput";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DarkGreen } from "../common/theme/colors";
import DropDownPicker from "react-native-dropdown-picker";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  return (
    <ResponsiveNavbar>
      <View style={styleDesktop.container}>
        <View style={styleDesktop.topBar}>
          <View style={styleDesktop.searchContainer}>
            <Ionicons name="search" size={35} color={DarkGreen} />
            <SearchInput style={styleDesktop.searchBar} />
          </View>
          <View style={styleDesktop.dropDownContainer}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </View>

      </View>
    </ResponsiveNavbar>

  );
}
