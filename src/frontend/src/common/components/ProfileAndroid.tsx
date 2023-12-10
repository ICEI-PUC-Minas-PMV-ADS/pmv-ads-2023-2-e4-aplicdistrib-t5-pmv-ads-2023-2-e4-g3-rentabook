import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import PrimaryButton from "./PrimaryButton"
import { View, Image, StyleSheet, Text, Platform } from "react-native"
import { useAlertMessage } from "../../contexts/Message";
import Input from "./Input";
import { API } from '@env'
import { DarkGreen, GreenLight, GreyColor, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import { userService } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/StackTypes";


const style = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    minHeight: 600,
    alignItems: "center",
    backgroundColor: WhiteColor,
    justifyContent: "space-evenly",
    borderRadius: 8,
    marginHorizontal: '3%',
    marginVertical: '3%',

  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    //textAlignVertical: "auto",
    borderRadius: 50,
  },
  form: {
    width: '80%',
  },
  input: {
    marginHorizontal: 10,
    marginVerdical: 10,
    height: 80,
    color: DarkGreen,

  },
  titulo: {
    margin: 0,
    padding: 0,
    alignSelf: "flex-start",
    marginLeft: 10,
    fontSize: 35,
    color: DarkGreen,
  },
  button: {
    marginTop: 30,
    alignSelf: "flex-end",
    color: GreenLight,
    backgroundColor: WhiteColor,
    width: 180,
    height: 50,

  },
  textbtn: {
    color: PrimaryGreenColor,
  },
  file: {
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: GreyColor,
    width: '90%'
  }
});

type ProfileAndroidProps = {
  nome?: string,
  email?: string,
  imagem?: string | null
  fetchUserdata: () => Promise<void>
}

export const ProfileAndroid = ({ email, nome, imagem, fetchUserdata }: ProfileAndroidProps) => {
  const [pNome, setPNome] = useState(nome)
  const [pImagem, setPImagem] = useState<ImagePicker.ImagePickerAsset | undefined>()
  const { showAlert } = useAlertMessage();
  const auth = React.useContext(AuthContext)
  const navigation = useNavigation<StackTypes>()

  const uploadProfile = async (name: string) => {
    var x = await userService.updatePrivateUser(name)
    await  sendFileMobile(pImagem)
    showAlert('Imagem salva com sucesso!!!!!')
    fetchUserdata()
}

  const uploadFileMobile = async () => {
    const pickImage = async () => {
      const { status } = await ImagePicker.
        requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        showAlert('O aplicativo não tem permissão para usar a camera.');
      } else {
        // const result = await ImagePicker.launchImageLibraryAsync();
        const result = await ImagePicker.launchImageLibraryAsync({allowsMultipleSelection: false})
        if (!result.canceled) {
          for(let i=0; i < result.assets.length;i++){
            setPImagem(result.assets[i])
          }        
        }
      }
    };

    pickImage();
  };
  
    useEffect(() => {
      setPNome(nome)
    },[nome]) 

  const sendFileMobile = async (image: ImagePicker.ImagePickerAsset |undefined) => {
    console.log(API)
    try {
      if (image !== undefined)  {
              const response = await userService.uploadImageMobile(image)
        const uploadedImagesResponse: string[] = [];
            uploadedImagesResponse.push(response.id)
      }
    } catch(e) {
      console.log(e);
      console.error("Erro ao enviar Imagem ao servidor!!");
    }
  };

  const handleLogout = async () => {
    if (auth.user) {
      const logout = await auth.logout()
      if (logout) {
        navigation.navigate("Anúncios", {})
      }
    }
  }

  return (
    <View>
      <View style={style.container}>
        
          <Image
            style={style.image}
            source={imagem ? { uri: (Platform.OS === 'web' ? API : "http://10.0.2.2:8080") + "/public/image/" + imagem } : require('../assets/notFound.jpg')}
            alt="Foto de Perfil."
          />
      
          <Text> Salvar Foto</Text>
          <PrimaryButton
            label="Select file"
            style={{ width: 200 }}
            onPress={() => {
              uploadFileMobile()
            }} />
            <PrimaryButton
            label="Logout"
            style={{ width: 200 }}
            onPress={() => {
              handleLogout()
            }} />
     
        <View style={{width:'90%'}} >
          <Input
            style={style.input}
            value={pNome}
            placeholder="Digite seu Nome"
            label="Nome"
            editable={true}
            onChangeText={setPNome}
          />
          <Input
            style={style.input}
            value={email}
            placeholder="E-mail"
            label="Email"
            editable={false}
          />

        </View>
        <PrimaryButton
          style={style.button}
          textStyle={style.textbtn}
          label="Salvar Alterações"
          onPress={ async () => {
              uploadProfile(pNome ?? "")
          }}
        />
      </View>
    </View>        
  )
} 