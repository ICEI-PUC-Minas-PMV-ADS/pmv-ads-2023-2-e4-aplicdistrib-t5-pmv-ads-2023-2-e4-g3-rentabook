import { View, StyleSheet, Text } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    justifyContent: 'space-between'
  },
});

export default function Signup() {
  return (
    <ResponsiveNavbar>
      <View style={style.container}>
        <Text>Cadastrar</Text>
      </View>
    </ResponsiveNavbar>
  );
}