import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/NavBar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});

export default function Chat() {
  return (
    <NavBar>
      <View style={style.container}>
        <Text>Mensagens</Text>
      </View>
    </NavBar>
  );
}