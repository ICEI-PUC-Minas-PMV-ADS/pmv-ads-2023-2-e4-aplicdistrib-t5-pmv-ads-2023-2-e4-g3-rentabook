import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import "../theme/colors"
import { DarkGreen, GreenLight, GreyColor, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { userService } from "../../services/userService";
import { API } from '@env'

const style = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center",
        backgroundColor: WhiteColor,
        justifyContent: "space-evenly",
        borderRadius: 8,
        marginHorizontal: 25,
        marginVertical: 10,
        width: 550,
        padding: 10,

    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
        textAlignVertical: "auto",
        borderRadius: 50,
    },
    form: {
        width:'80%',
    },
    input: {
        marginHorizontal: 20,
        marginVerdical: 10,
        width: '100%',
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
    textbtn:{
        color: PrimaryGreenColor,
    },
    file: {
        marginBottom: 10,
        alignSelf:"center",
        backgroundColor: GreyColor,
        width: '90%'
    }
});

type ProfileBoxProps = {
    nome?: string,
    email?: string,
    imagem?: string | null
    fetchUserdata: () => Promise<void>

}
export default function ProfileBox({ nome, email, imagem, fetchUserdata }: ProfileBoxProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pEmail] = useState(email)
    const [pNome, setPNome] = useState(nome)

    const ImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setSelectedFile(file);
        }
      };

      const uploadfile = async () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
            userService.updatePrivateUserImage(formData)
            alert("DEU CERTO")
            window.location.reload()
        } else {
          alert('Selecione um arquivo antes de fazer o upload.');
        }
      };

    useEffect(() => {

    }, [pEmail, pNome,])

    const updateUser = async (name: string) => {
        var x = await userService.updatePrivateUser(name)

    }

    console.log(API + "/public/image/" + imagem)
    return (
        <View style={style.container}>
            <Image
                style={style.image}
                source={ imagem ? { uri: API + "/public/image/" + imagem } : require('../assets/notFound.jpg')}
                alt="Foto de Perfil."
            />
            <View style={style.form}> 
                <Text style={style.titulo} >Meu Perfil</Text>

                <View style={style.file}>
                    <input
                        type="file"
                        name='teste'
                        accept="image/*"
                        onChange={ImageFile}
                    />
                </View>


                <Input
                    style={style.input}
                    value={nome}
                    placeholder="Digite seu Nome"
                    label="Nome"
                    onChangeText={setPNome}

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
                textStyle={style.textbtn}
                label="Editar Perfil"
                onPress={async () => {
                     updateUser(pNome ?? "");
                     uploadfile()
                    }}
            />


        </View>
    )
}
