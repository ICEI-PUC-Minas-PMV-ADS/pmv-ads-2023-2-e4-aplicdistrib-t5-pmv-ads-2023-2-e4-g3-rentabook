import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/NavBar";

const style = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1
  },
});

export default function Home() {
  return (
    <NavBar>
      <View style={style.container}>
        <Text>Home</Text>
      </View>
    </NavBar>

  );
}
