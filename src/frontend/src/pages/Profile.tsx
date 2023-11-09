import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import { AuthContext } from "../contexts/Auth/AuthContext";
import React from "react";
import ProfileBox from "../common/components/ProfileBox";
import ProfileAddressBox from "../common/components/ProfileAddressBox";
import { PrivateAddress } from "../types/PrivateAddress";


const style = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
  },
});

export default function Profile() {
  const [image, setImage] = useState<string | null>(null)
  const [nome, setNome,] = useState('')
  const [email, setEmail] = useState('')
  const [addressList, setAddressList] = useState<PrivateAddress[] | null[]>([])
  const auth = useContext(AuthContext)


  const fetchUserData = async () => {
    // TODO: Carregar as informações do usuario
    const userData = await auth.loadUserData();
    setAddressList(userData.addresses)
    setNome(userData.name)
    setImage(userData.userImage)
  };

  useEffect(() => {
    if (auth.user != null) {
      setNome(auth.user.name)
      setEmail(auth.user.email)
      setImage(auth.user.userImage)
    }
    fetchUserData();
  }, [nome])

  return (
  
    <ResponsiveNavbar>
      <View style={{ flex:1, backgroundColor: "#E1DCC5" }}>
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
      </View>
    </ResponsiveNavbar>
  );
}