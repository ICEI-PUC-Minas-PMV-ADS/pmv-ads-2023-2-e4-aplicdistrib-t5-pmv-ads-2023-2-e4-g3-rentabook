import React from "react";

import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import "../theme/colors"
import { BlackColor, WhiteColor } from "../theme/colors";

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: WhiteColor,
      justifyContent: 'space-between',
      borderWidth: 3,
      borderRadius: 6,
      borderColor: BlackColor,
      marginHorizontal: 25,
      marginVertical: 10,
      height: 500,
      width: 500,
    },
    image :{

    },

  });


export default function ProfileBox ( ) {
    return(
        <View style ={style.container}>
          <Image 
            style={style.image}
            source={}
            alt="Foto de Perfil DEVE SER ALTERADO OS CAMINHOS."
          />

        </View>
    )
}