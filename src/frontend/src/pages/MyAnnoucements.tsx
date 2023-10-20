import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});

export default function MyAnnouncements() {
  return (
    <ResponsiveNavbar>
      <View style={style.container}>
        <Text>Meus anuncios</Text>
      </View>
    </ResponsiveNavbar>
  );
}