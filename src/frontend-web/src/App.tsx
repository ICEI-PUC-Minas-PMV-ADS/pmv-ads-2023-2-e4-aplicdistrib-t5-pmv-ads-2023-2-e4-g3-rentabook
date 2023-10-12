import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ClickOutsideProvider } from "react-native-click-outside";
import PrimaryButton from "./common/components/PrimaryButton";
import SecondaryButton from "./common/components/SecondaryButton";
import DestructiveButton from "./common/components/DestructiveButton";
import Input from "./common/components/Input";
import Dropdown from "./common/components/Dropdown";
import TextArea from "./common/components/TextArea";
import ComposedButton from "./common/components/ComposedButton";
import SearchInput from "./common/components/SearchInput";
import Separator from "./common/components/Separator";
import CheckedLabel from "./common/components/CheckedLabel";
import Navbar from "./common/components/Navbar";

const items = [
  { title: "Item #1", value: 1 },
  { title: "Item #2", value: 2 },
  { title: "Item #3", value: 3 },
];

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

function App() {
  return (
    <View style={style.container}>
      <ClickOutsideProvider>
        <Navbar />
        <PrimaryButton label="Confirmar" onClick={() => {}} />

        <View style={{ height: 10 }} />
        <SecondaryButton
          label="Pesquisar"
          onClick={() => {
            console.log("click");
          }}
        />

        <View style={{ height: 10 }} />
        <DestructiveButton label="Cancelar" onClick={() => {}} />

        <View style={{ height: 10 }} />
        <Input label="Nome" />

        <View style={{ height: 10 }} />
        <Dropdown placeholder="Ordenar por" items={items}>
          {(value) => <Text>{value.title}</Text>}
        </Dropdown>

        <View style={{ height: 10 }} />
        <TextArea placeholder="Texto" />

        <View style={{ height: 10 }} />
        <ComposedButton
          title="Localização"
          subtitle="(Meu endereço)"
          onClick={() => {}}
        />

        <View style={{ height: 10 }} />
        <SearchInput placeholder="Pesquisar por livro" />

        <View style={{ height: 10 }} />
        <Separator label="ou" />

        <View style={{ height: 10 }} />
        <CheckedLabel label="Disponível para aluguel" />
      </ClickOutsideProvider>
    </View>
  );
}

export default App;
