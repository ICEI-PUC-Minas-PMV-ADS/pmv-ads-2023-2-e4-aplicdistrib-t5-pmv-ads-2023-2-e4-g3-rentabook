import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { DarkGreen, GreenLight, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { PrivateAddress } from "../../types/PrivateAddress";

const style = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection:"row",
      alignItems: "center",
      backgroundColor: WhiteColor,
      justifyContent: 'space-evenly',
      borderRadius: 8,
      marginHorizontal: 25,
      marginVertical: 10,
      padding: 10,
    
    },
    input: {
        marginHorizontal: 30,
        marginVerdical: 10,
        maxWidthwidth: 450,
        maxHeighteight: 80,
        color: DarkGreen,
        
    },
    form: {
        width:400
    },
    address: {
        alignSelf:"flex-start",
        margin: 20,

    },
    titulo : {
        alignSelf: "flex-start",
        marginLeft: 20,
        fontSize: 35,
        color: DarkGreen,
    },
    button: {
        marginTop: 70,
        alignSelf: "flex-end",
        color: "#000000",
        backgroundColor: GreenLight,
        width: 180,
        height: 50,
        
    }, 
    inputNumero:{
        width: 60,

    }
  });
type ProfileAddressBoxProps = {
    enderecos?: PrivateAddress[] | null[]

}

export default function ProfileAddressBox ({enderecos}:ProfileAddressBoxProps) {
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [listaEnderecos, setListaEnderecos] = useState(enderecos)

    const [enderecoSelecionado, setEnderecoSelecionado] = useState<PrivateAddress>()

    useEffect( () => {


    },[]) 

    useEffect(() => {
      setCep()
      setRua()
      setNumero()
      setComplemento()
      setBairro()
      setCidade()
      setEstado()
      
    },[enderecoSelecionado])
    
    return (
        <View style={style.container}>
            <View style={style.form}>
                <Text style={style.titulo}> Meus Endereços: </Text>
                <Input
                    style={style.input}
                    value={cep}
                    placeholder="Digite o CEP"
                    label="CEP"
                    onChangeText={setCep}
                />
                
                    <Input
                        style={style.input}
                        value={rua}
                        placeholder="Rua"
                        label="Rua"
                        onChangeText={setRua}
                    />
                    <Input
                        style={style.input}
                        value={numero}
                        placeholder="N°"
                        label="Número"
                        onChangeText={setNumero}
                    />


                <Input
                    style={style.input}
                    value={complemento}
                    placeholder="Complemento"
                    label="Complemento"
                    onChangeText={setComplemento}
                />
                <Input
                    style={style.input}
                    value={bairro}
                    placeholder="Bairro"
                    label="Bairro"
                    onChangeText={setBairro}
                />
                <Input
                    style={style.input}
                    value={cidade}
                    placeholder="Cidade"
                    label="cidade"
                    onChangeText={setCidade}
                />
                <Input
                    style={style.input}
                    value={estado}
                    placeholder="Estado"
                    label="Estado"
                    onChangeText={setEstado}
                />
                <PrimaryButton
                    style={style.button}
                    label="Salvar."
                    onPress={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
      
            </View>
            <View style={style.address}>
            <Text style={style.titulo}> Meus Endereços: </Text>               
                <ul>
                    {
                        enderecos && enderecos.map ((endereco, index) => (
                            <li key={index}>
                                {endereco?.cep}
                            </li>
                        ))
                    }
                    <li>Teste Endereço</li>
                 
                </ul>
            </View>
        </View>
    )
}