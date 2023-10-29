import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import "../theme/colors"
import { DarkGreen, GreenLight, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { UpdateUserForm } from "../../types/UpdateUserForm";
import { userService } from "../../services/userService";

const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: WhiteColor,
      justifyContent: 'space-evenly',
      borderRadius: 8,
      marginHorizontal: 25,
      marginVertical: 10,
      width: 550,
      padding: 10,
    
    },
    image :{        
        width: 150,
        height: 150,
        alignSelf: "center",
        textAlignVertical:"auto",
        borderRadius: 50,
    },
    input: {
        marginHorizontal: 30,
        marginVerdical: 10,
        width: 400,
        height: 80,
        color: DarkGreen,
        
    },
    box: {
        
    },
    titulo : {
        margin:0,
        padding:0,
        alignSelf: "flex-start",
        marginLeft: 10,
        fontSize: 35,
        color: DarkGreen,
    },
    button: {
        color: "#000000",
        backgroundColor: GreenLight,
        width: 180,
        height: 50,
        
    }
  });

  type ProfileBoxProps ={
    nome? : string ,
    email? : string,
    imagem?: string | null

  }
export default function ProfileBox({nome , email , imagem}: ProfileBoxProps) {
    const [pEmail, setPEmail] = useState(email)
    const [pNome, setPNome] = useState(nome)
   
    useEffect ( () => {
    
    },[pEmail, pNome,])

    function updateWindow () {

        
    }

    return (
        <View style={style.container}>
            <Image
                style={style.image}
                source={imagem ?? require('../assets/notFound.jpg')}
                alt="Foto de Perfil."
            /> 
            <Text style={style.titulo} >Meu Perfil</Text>
            <View style={style.box}>
           
            <Input
                style={style.input}
                value={nome}
                placeholder="Digite seu Nome"
                label="Nome"
                editable={false}
                
            />
            <Input
                style={style.input}
                value={email}
                placeholder="Digite seu e-mail"
                label="Email"
                editable={false}
            />
       
            </View>
            <PrimaryButton
             style={style.button}
                label="Editar Perfil"
                onPress={updateWindow}
            />
      

        </View>
    )
}
