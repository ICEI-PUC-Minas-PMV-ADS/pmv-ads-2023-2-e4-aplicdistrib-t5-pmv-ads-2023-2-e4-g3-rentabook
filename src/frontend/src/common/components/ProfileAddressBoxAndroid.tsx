import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BlackColor, DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { PrivateAddress } from "../../types/PrivateAddress";
import { addressService } from "../../services/addressService";
import { useViaCep } from "../../hooks/useViaCep";
import { Picker } from "@react-native-picker/picker";
import { useAlertMessage } from "../../contexts/Message";

const style = StyleSheet.create({
    container: {

        flex: 2,
        flexDirection: "column",
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
        maxWidth: '95%',
        maxHeight: 80,
        color: BlackColor,
    },
    form: {
        width: '95%',

    },
    formAndroid: {
        width: '60%',
        flex: 1,
        flexDirection: "column",
    },
    address: {
        width: '80%',
        alignSelf: "flex-start",

    },
    titulo: {
        alignSelf: "flex-start",
        marginLeft: 5,
        fontSize: 28,
        color: DarkGreen,
    },
    button: {
        marginTop: 30,
        alignSelf: "center",
        color: GreenLight,
        backgroundColor: WhiteColor,
        width: 180,
        height: 50,

    },
    textbtn: {
        color: PrimaryGreenColor,
    },
    buttonDeletar: {
        marginTop: 30,
        alignSelf: "center",
        backgroundColor: '#DC143C',
        borderColor: '#800000',
        width: 180,
        height: 50,

    },
    lista: {
        paddingTop: 45,
    },
    itemLista: {
        padding: 8,
    },
    itemText: {
        fontWeight: "500",
        fontSize: 16,
    }
});
type ProfileAddressBoxAndroidProps = {
    enderecos?: PrivateAddress[] | null[],
    onDeleteAddress: () => void,
    onSaveAddress: () => void,

}

export default function ProfileAddressBoxAndroid({ enderecos, onDeleteAddress }: ProfileAddressBoxAndroidProps) {
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
    const { showAlert } = useAlertMessage();


    const deletaEndereco = (id: string) => {

        if (id != "") {
            addressService.deletePrivateAddress(id).then(() => {
                setIdEnderecoSelecionado('')
                setEnderecoSelecionado(false)
                limparFormularioEndereco()
                showAlert("O endereço foi deletado com sucesso!!")
                onDeleteAddress()
            })

        } else {
            showAlert("Erro, não foi possivel deletar o endereço!!")

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
        addressService.savePrivateAddress(endereco).then((endereco) => {
            if (endereco) {
                showAlert("O endereco foi salvo com sucesso!")
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
        addressService.savePrivateAddress(endereco).then((endereco) => {
            if (endereco) {
                showAlert("O endereco foi salvo com sucesso")
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
            <View style={style.address}>
                <Text style={style.titulo}> Meus Endereços: </Text>
                <View style={style.lista} >
                    <Picker
                        selectedValue={idEnderecoSelecionado}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue === "new") {
                                limparFormularioEndereco();
                                setEnderecoSelecionado(false);
                                setIdEnderecoSelecionado('');
                            } else {
                                selecionaEndereco(itemValue)
                            }

                        }}
                    >
                        <Picker.Item label="NOVO ENDERECO" value="new" />
                        {
                            enderecos?.map((endereco, index) => (
                                <Picker.Item
                                    key={index}
                                    label={endereco?.name}
                                    value={endereco?.id}
                                />
                            ))}
                    </Picker>
                </View>
            </View>

            <View style={style.form}>
                <Text style={style.titulo}>Dados do Endereço: </Text>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
                    <Input
                        style={{ width: 180, marginHorizontal: '10%'  }}
                        value={cep}
                        placeholder="Digite o CEP"
                        label="CEP"
                        onChangeText={setCep}
                    />
                    <PrimaryButton
                        label='Buscar'
                        style={{width: 60, height: 45, marginVertical: '35%'   }}
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
                            onPress={() => saveAdrress()}
                        />)
                }
            </View>

            
        </View>
    )
}
