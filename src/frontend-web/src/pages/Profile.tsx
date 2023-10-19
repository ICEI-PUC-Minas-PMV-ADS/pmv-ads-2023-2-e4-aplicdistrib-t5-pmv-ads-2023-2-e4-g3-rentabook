import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import NavBar from "../common/components/Navbar";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParamsList } from "../routes/AppParamsList";


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});



export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<AppParamsList>>()
  const auth = React.useContext(AuthContext)
  const handleLogout = async () => {
    if (auth.user) {
      const logout = await auth.logout()
      if (logout) {
        navigation.navigate("Home", {})
      } 
    }

  }
  return (
    <View style={style.container}>
      <NavBar />
      <Text>Meu Perfil</Text>
      <button onClick={handleLogout}>Logout</button>
    </View>
  );
}