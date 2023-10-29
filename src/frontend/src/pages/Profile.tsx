import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { StackTypes } from "../routes/StackTypes";
import React from "react";
import ProfileBox from "../common/components/ProfileBox";
import ProfileAddressBox from "../common/components/ProfileAddressBox";
import { PrivateAddress } from "../types/PrivateAddress";


const style = StyleSheet.create({
  container: {
    flexDirection:"row",
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});



export default function Profile() {
  const navigation = useNavigation<StackTypes>()
  const [image, setImage] = useState<string|null>(null)
  const [nome, setNome,] = useState('')
  const [email, setEmail ] = useState('')
  const auth = useContext(AuthContext)
  const [addressList, setAddressList] = useState<PrivateAddress[] | null[]>([])

  const handleLogout = async () => {
    if (auth.user) {
      const logout = await auth.logout()
      if (logout) {
        navigation.navigate("Anúncios", {})
      }
    }
  }

  useEffect(() => {
    if (auth.user != null ) {
      setNome(auth.user.name)
      setEmail(auth.user.email)
      setImage(auth.user.userImage)
    }
    if(auth.user?.addresses != undefined){
      setAddressList(auth.user?.addresses)
    }

  },[auth.user])
  
  

  return (
    <ResponsiveNavbar>
      <View style={style.container}>
        <ProfileBox 
         nome={nome}
         email={email}
         imagem = {image}
        />
        <ProfileAddressBox 
          enderecos={addressList}
        />
        <Button onPress={handleLogout} title="Logout" />
      </View> 
    </ResponsiveNavbar>
  );
}