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
      <Dropdown items={[1, 2, 3]} onSelect={(val) => { console.log(val) }}>
        {(val) => <Text style={{ backgroundColor: "white" }}>{val}</Text>}
      </Dropdown>
    </View>
  );
}
