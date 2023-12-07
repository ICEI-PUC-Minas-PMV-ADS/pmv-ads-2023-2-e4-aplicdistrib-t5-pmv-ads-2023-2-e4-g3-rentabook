import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Alert, Button, TouchableOpacity } from "react-native";
import { BlackColor, DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { PrivateAddress } from "../../types/PrivateAddress";
import { addressService } from "../../services/addressService";
import { useViaCep } from "../../hooks/useViaCep";

const style = StyleSheet.create({

    container: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: WhiteColor,
        justifyContent: 'space-evenly',
        borderRadius: 8,
        marginHorizontal: '3%',
        marginVertical: '3%',
        padding: 10,

    },
    input: {   
        marginHorizontal: '10%',
        marginVerdical: 100,
        maxWidth: '80%',
        maxHeight: 80,
        color: BlackColor,
    },
    form: {
        width: '60%',
        
    },
    address: {
        width: '40%',
        alignSelf: "flex-start",
        margin: 20,

    },
    titulo: {
        alignSelf: "flex-start",
        marginLeft: 20,
        fontSize: 30,
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
        color:PrimaryGreenColor,
    },
    buttonDeletar: {
        marginTop: 30,
        alignSelf: "flex-end", 
        backgroundColor:'#DC143C',
        borderColor: '#800000',
        width: 180,
        height: 50,

    },
    lista:{
        paddingTop: 45,
    },
    itemLista: {
        padding: 8,
    },
    itemText: {
        fontWeight:"500",
        fontSize: 16,
    },
    btnBuscar: {
        width: 60,
        height: 40,
    }
});
type ProfileAddressBoxProps = {
    enderecos?: PrivateAddress[] | null[],
    onDeleteAddress: () => void,
    onSaveAddress: () => void,

}

export default function ProfileAddressBox({ enderecos, onDeleteAddress }: ProfileAddressBoxProps) {
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [enderecoSelecionado, setEnderecoSelecionado] = useState<boolean>(false)
    const [idEnderecoSelecionado, setIdEnderecoSelecionado] = useState<string>('')

    const deletaEndereco = (id: string) => {

        if (id != "" && confirm("Realmente deseja deletar")) {
            addressService.deletePrivateAddress(id).then(() => {
                setIdEnderecoSelecionado('')
                setEnderecoSelecionado(false)
                limparFormularioEndereco()
                alert("O endereço foi deletado com sucesso!!")
                onDeleteAddress()
            })

        } else {
            alert("Erro, não foi possivel deletar o endereço!!")
    
        }

    }

    const saveAdrress = () => {
        const endereco: PrivateAddress = {
            name: nome,
            cep: cep,
            street: rua,
            number: numero,
            complement: complemento,
            neighborhood: bairro,
            city: cidade,
            state: estado
        };    
        addressService.savePrivateAddress(endereco).then( (endereco) => {
             if(endereco){
                alert("O endereco foi salvo com sucesso")
                location.reload()
             }
        })
       
    }

    const alteraEndereco = () => {
        const endereco: PrivateAddress = {
            id: id,
            name: nome,
            cep: cep,
            street: rua,
            number: numero,
            complement: complemento,
            neighborhood: bairro,
            city: cidade,
            state: estado
        };    
        addressService.savePrivateAddress(endereco).then( (endereco) => {
             if(endereco){
                alert("O endereco foi salvo com sucesso")
                location.reload()
             }
        })
    }

    async function carregaEndereçoSelecionado(idSelecionado: string) {
        var endereco = await addressService.getPrivateAddress(idSelecionado)
        preencheEndereco(endereco)
    }

    function preencheEndereco(endereco: PrivateAddress) {
        setId(endereco.id ?? '')
        setNome(endereco.name ?? '')
        setCep(endereco.cep)
        setRua(endereco.street)
        setNumero(endereco.number)
        setComplemento(endereco.complement ?? '')
        setBairro(endereco.neighborhood)
        setCidade(endereco.city)
        setEstado(endereco.state)
    }

    const limparFormularioEndereco = () => {
        setId('')
        setNome('')
        setCep('')
        setRua('')
        setNumero('')
        setComplemento('')
        setBairro('')
        setCidade('')
        setEstado('')
    };

    const selecionaEndereco = (id: string) => {
        setEnderecoSelecionado(true)
        setIdEnderecoSelecionado(id)
        carregaEndereçoSelecionado(id)
    }

    const addressCepPicker = async (cep: string) => {
        try {
            var endereco = await useViaCep(cep)          
            setBairro(endereco.bairro)
            setCidade(endereco.localidade)
            setEstado(endereco.uf)
            setComplemento(endereco.complemento)
        } catch (error) {
            console.error("Erro ao buscar endereço:", error);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.form}>
                <Text style={style.titulo}>Dados do Endereço: </Text>
                <View style={{ flex:1, flexDirection:"row", alignItems:"flex-end" }}>
                    <Input
                        style={style.input}
                        value={cep}
                        placeholder="Digite o CEP"
                        label="CEP"
                        onChangeText={setCep}
                    />
                    <PrimaryButton
                            label='Buscar'
                            style={style.btnBuscar}
                            onPress={() => {
                              addressCepPicker(cep)
                            }} />
                </View>

                <Input
                    style={style.input}
                    value={nome}
                    placeholder="Descrição do Endereço."
                    label="Descrição:"
                    onChangeText={setNome}
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
                {
                    enderecoSelecionado == true
                        ? (
                        <>                        
                            <PrimaryButton
                                style={style.buttonDeletar}
                                label="DELETAR."
                                onPress={() => deletaEndereco(idEnderecoSelecionado)}
                            />                      
                        </>
                       ) : (<PrimaryButton
                            style={style.button}
                            textStyle={style.textbtn}
                            label="SALVAR."
                            onPress={ () => saveAdrress()}
                        />)
                }


            </View>
            <View style={style.address}>
                <Text style={style.titulo}> Meus Endereços: </Text>
                <View style={style.lista} >
                    {
                        enderecos?.map((endereco, index) => (
                            <Pressable key={index} onPress={() => { selecionaEndereco(endereco?.id ?? '') }}>
                                <View><Text>{endereco?.street} - {endereco?.number}</Text></View>
                            </Pressable>
                        ))
                    }
                    <Pressable
                        style={style.itemLista}
                        onPress={() => {
                        limparFormularioEndereco();
                        setEnderecoSelecionado(false);
                        setIdEnderecoSelecionado('');
                    }}><View><Text style={style.itemText}> NOVO ENDEREÇO </Text></View></Pressable>
                </View>
            </View>
        </View>
    )
}
