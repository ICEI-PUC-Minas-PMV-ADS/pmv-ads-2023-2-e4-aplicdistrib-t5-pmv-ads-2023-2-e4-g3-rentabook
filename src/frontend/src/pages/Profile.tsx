import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button, ScrollView } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { StackTypes } from "../routes/StackTypes";
import React from "react";
import ProfileBox from "../common/components/ProfileBox";
import ProfileAddressBox from "../common/components/ProfileAddressBox";
import { PrivateAddress } from "../types/PrivateAddress";


const style = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
    backgroundColor: "#E1DCC5",
  },
});

export default function Profile() {
  const navigation = useNavigation<StackTypes>()
  const [image, setImage] = useState<string | null>(null)
  const [nome, setNome,] = useState('')
  const [email, setEmail] = useState('')
  const [addressList, setAddressList] = useState<PrivateAddress[] | null[]>([])
  const auth = useContext(AuthContext)

  const handleLogout = async () => {
    if (auth.user) {
      const logout = await auth.logout()
      if (logout) {
        navigation.navigate("Anúncios", {})
      }
    }
  }

  const fetchUserData = async () => {
    // TODO: Carregar as informações do usuario
    const userData = await auth.loadUserData();
    setAddressList(userData.addresses)
  };

  useEffect(() => {
    if (auth.user != null) {
      setNome(auth.user.name)
      setEmail(auth.user.email)
      setImage(auth.user.userImage)
    }
    fetchUserData();
  }, [])

  return (
    <ResponsiveNavbar>
      <ScrollView>
        <View style={style.container}>
          <ProfileBox
            nome={nome}
            email={email}
            imagem={image}
            fetchUserdata={() => fetchUserData()}
          />
          <ProfileAddressBox
            enderecos={addressList}
            onSaveAddress={() => { fetchUserData() }}
            onDeleteAddress={() => { fetchUserData() }}
          />
        </View>
      </ScrollView>

    </ResponsiveNavbar>
  );
}