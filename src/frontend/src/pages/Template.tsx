import * as React from "react";
import { View, StyleSheet } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});

export default function Home() {
  return (
    <ResponsiveNavbar>
      <View style={style.container}></View>
    </ResponsiveNavbar>
  );
}
