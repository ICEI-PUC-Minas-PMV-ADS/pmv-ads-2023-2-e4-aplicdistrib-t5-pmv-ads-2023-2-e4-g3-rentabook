import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../common/components/Navbar";
import Dropdown from "../common/components/Dropdown";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});

export default function Home() {
  return (
    <View style={style.container}>
      <NavBar />

      <Text>Dropdown #1</Text>
      <Dropdown items={[1, 2, 3]} onSelect={(val) => { console.log(val) }}>
        {(val) => <Text style={{ backgroundColor: "white" }}>{val}</Text>}
      </Dropdown>

      <Text>Dropdown #2</Text>
      <Dropdown items={[{ id: 1, name: "pedro" }, { id: 2, name: "carlos" }, { id: 3, name: "maria" }]} onSelect={(val) => { console.log(val.name) }}>
        {(val) => <Text style={{ backgroundColor: "white" }}>{val.name}</Text>}
      </Dropdown>
    </View>
  );
}
