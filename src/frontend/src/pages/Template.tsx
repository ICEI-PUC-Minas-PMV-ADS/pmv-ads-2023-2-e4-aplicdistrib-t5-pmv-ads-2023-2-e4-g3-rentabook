import * as React from "react";
import { View, StyleSheet } from "react-native";
import NavBar from "../common/components/Navbar";

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
    </View>
  );
}
