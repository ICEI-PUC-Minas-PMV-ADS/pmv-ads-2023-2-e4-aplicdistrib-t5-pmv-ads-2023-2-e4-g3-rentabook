import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/Navbar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    justifyContent: 'space-between'
  },
});

export default function Signup() {
  return (
    <NavBar>
      <View style={style.container}>
        <Text>Cadastrar</Text>
      </View>
    </NavBar>
  );
}