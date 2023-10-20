import * as React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../routes/StackTypes";


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    justifyContent: 'space-between'
  },
});



export default function Profile() {
  const navigation = useNavigation<StackTypes>()
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
    <ResponsiveNavbar>
      <View style={style.container}>
        <Text>Meu Perfil</Text>
        <Button onPress={handleLogout} title="Logout" />
      </View>
    </ResponsiveNavbar>
  );
}