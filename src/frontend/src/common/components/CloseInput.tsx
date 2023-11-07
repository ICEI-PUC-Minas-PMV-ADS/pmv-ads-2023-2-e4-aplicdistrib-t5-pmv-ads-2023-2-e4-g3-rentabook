import React from "react"
import { View, StyleSheet, Pressable, Image } from "react-native"

const style = StyleSheet.create({
    btnClose: {
        alignSelf:"flex-end",
        width: 40,
        height: 40,
        backgroundColor: '#fffff'
    }
})

type CloseInputProps = {
    deletaImage : () => Promise<void>
}

export default function CloseInput({deletaImage}: CloseInputProps) {
    return (

        <View style={style.btnClose}>
            <Pressable onPress={deletaImage}>
                <Image
                    source={require('../assets/closeIcon.png')}
                    alt="imagem circulo vermelho com um x branco ao centro." 
                    style={{width:30, height:30}}
                    />              
            </Pressable>
        </View>

    )
}