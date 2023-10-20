import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/Navbar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});

export default function MyAnnouncements() {
  return (
    <NavBar>
      <View style={style.container}>
        <Text>Meus anuncios</Text>
      </View>
    </NavBar>
  );
}