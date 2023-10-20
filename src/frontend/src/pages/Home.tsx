import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import SearchInput from "../common/components/SearchInput";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../common/components/PrimaryButton";
import { PrimaryGreenColor, WhiteColor } from "../common/theme/colors";
import { Desktop } from "../hooks/useResposive";

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

const data = [

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

  }
});

export default function Home() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [rent, setRent] = useState(false);
  const [trade, setTrade] = useState(false);
  const [sale, setSale] = useState(false);

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
                value={value}
                items={dropDownData}
                setOpen={setOpen}
                setValue={setValue}
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
          </View>
        </View>
      </Desktop>
    </ResponsiveNavbar>

  );
}
