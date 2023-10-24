import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import "../theme/colors"
import { BlackColor, DarkGreen, GreenLight, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: WhiteColor,
      justifyContent: 'space-evenly',
      borderRadius: 8,
      marginHorizontal: 25,
      marginVertical: 10,
      width: 500,
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
        width: 450,
        height: 80,
        color: DarkGreen,
        
    },
    box: {
        
        

    },
    titulo : {
        alignSelf: "flex-start",
        marginLeft: 20,
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
export default function ProfileBox() {
    const [email, setEmail] = useState('')
    const [Nome, setNome] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={style.container}>
            <Image
                style={style.image}
                source={require('../assets/notFound.jpg')}
                alt="Foto de Perfil."
            /> 
            <Text style={style.titulo} >Meu Perfil</Text>
            <View style={style.box}>
           
            <Input
                style={style.input}
                value={Nome}
                placeholder="Digite seu Nome"
                label="Nome"
                onChangeText={setNome}
            />
            <Input
                style={style.input}
                value={email}
                placeholder="Digite seu e-mail"
                label="Email"
                onChangeText={setEmail}
            />
            <Input
                style={style.input}
                value={password}
                placeholder="Digite sua Senha"
                label="Senha"
                onChangeText={setPassword}
            />
            </View>
            <PrimaryButton
             style={style.button}
             label="Enviar Informações" 
             onPress={function (): void {
                throw new Error("Function not implemented.");
                }} 
            />
      

        </View>
    )
}
