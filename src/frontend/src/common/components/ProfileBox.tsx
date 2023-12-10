import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import "../theme/colors"
import { DarkGreen, GreenLight, GreyColor, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { userService } from "../../services/userService";
import { API } from '@env'
import CloseInput from "./CloseInput";

const style = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 700,
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

type ProfileBoxProps = {
    nome?: string,
    email?: string,
    imagem?: string | null
    fetchUserdata: () => Promise<void>

}
export default function ProfileBox({ nome, email, imagem, fetchUserdata }: ProfileBoxProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [pNome, setPNome] = useState(nome)
    const [btnDeleteImage, setBtnDeleteImage] = useState<Boolean>(false)
    const [pImage, setPImage] = useState(imagem)

    const ImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    useEffect(() => {
        setPImage(imagem)
        if (imagem != null) {
            setBtnDeleteImage(true)
        } else {
            setBtnDeleteImage(false)
        }
    }, [imagem])

    useEffect(() => {
        setPNome(nome)
    }, [nome])

    const uploadfile = async (name: string) => {
        var x = await userService.updatePrivateUser(name)
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            await userService.updatePrivateUserImage(formData)
        }
        alert('Suas alterações foram salvas com sucesso')
        fetchUserdata()
    }

    const deleteProfileImageFile = async () => {
        const conf = confirm('Deseja Realmente deletar a Imagem de Perfil?')
        if (conf) { await userService.deletePrivateUserImage() }
        fetchUserdata()
    }

    return (
        <View style={style.container}>
            {
                btnDeleteImage === true ?
                    (<CloseInput deletaImage={deleteProfileImageFile} />) : ("")
            }

            <Image
                style={style.image}
                source={pImage ? { uri: (Platform.OS === 'web' ? API : 'https://rentabookapi.azurewebsites.net') + "/public/image/" + pImage } : require('../assets/notFound.jpg')}
                alt="Foto de Perfil."
            />

            <View style={style.form}>
                <Text style={style.titulo} >Meu Perfil</Text>

                <View style={style.file}>
                    {/* <Image source={require('../../common/assets/notFound.jpg')} /> */}
                    <input
                        type="file"
                        name='teste'
                        accept="image/*"
                        onChange={ImageFile}
                    />
                </View>


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
                onPress={async () => {
                    uploadfile(pNome ?? "")
                }}
            />
        </View>
    )
}
