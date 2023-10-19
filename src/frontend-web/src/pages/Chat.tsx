import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/Navbar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});

export default function Chat() {
  return (
    <View style={style.container}>
      <NavBar />
      <Text>Chat</Text>
    </View>
  );
}