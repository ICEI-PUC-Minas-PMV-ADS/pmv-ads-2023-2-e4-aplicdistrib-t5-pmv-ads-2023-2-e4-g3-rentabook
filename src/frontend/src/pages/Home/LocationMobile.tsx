import { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import { GreenLight, GreyColor, PrimaryGreenColor, DarkGreen, WhiteColor } from "../../common/theme/colors";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import PrimaryButton from "../../common/components/PrimaryButton";
import Input from "../../common/components/Input";
import { PrivateAddress } from "../../types/PrivateAddress";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/StackTypes";
import { HomeContext } from "../../contexts/Home/HomeContext";

export default function LocationMobile() {

  const { inputCepValue, setInputCepValue, inputCepError, setInputCepError, cepMessageError, selectedAddress, setSelectedAddress, setAddressModalIsVisible, handleCep } = useContext(HomeContext)

  const [openMyAddresses, setOpenMyAddresses] = useState(false)
  const [openOtherLocation, setOpenOtherLocation] = useState(false)
  const authContext = useContext(AuthContext)
  const navigation = useNavigation<StackTypes>()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBackContainer}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setAddressModalIsVisible(false)}>
          <Ionicons name='arrow-back' size={35} color={DarkGreen} />
          <Text style={styles.goBackText}>Voltar</Text>
        </Pressable>
        {
          authContext.defaultAddress != null &&
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
            authContext.removeDefaultAddress()
            setAddressModalIsVisible(false)
          }}>
            <Text style={styles.goBackText}>Limpar</Text>
          </Pressable>
        }
      </View>
      <KeyboardAvoidingView keyboardVerticalOffset={60} style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.modalTitle}>Selecione o seu endereço</Text>
            <Text style={{ paddingLeft: 20 }}>Você poderá ver os anúncios mais pertos de você</Text>
          </View>
          {
            authContext.user != null &&
            <>
              <Pressable onPress={() => setOpenMyAddresses(!openMyAddresses)} style={styles.dropDownSelectedItem}>
                <View>
                  <Text style={styles.fontDropTitle}>Em um de seus endereços</Text>
                </View>
                <Ionicons name={openMyAddresses == true ? 'chevron-up' : 'chevron-down'} size={25} color={PrimaryGreenColor} />
              </Pressable>

              {
                openMyAddresses == true &&

                <>
                  {authContext.user?.addresses.map(a => (
                    <Pressable key={a?.id} onPress={() => {
                      setSelectedAddress(a)
                    }
                    } style={styles.dropDownItem}>
                      <View>
                        <Text>{a?.street}</Text>
                        <Text>CEP:{a?.cep} - {a?.city}, {a?.state}</Text>
                      </View>
                      <Ionicons name={a?.id == selectedAddress?.id ? "radio-button-on" : "radio-button-off"} size={25} color={PrimaryGreenColor} />
                    </Pressable>

                  ))}
                  <Pressable onPress={() => {
                    navigation.navigate('Meu Perfil', {})
                    setAddressModalIsVisible(false)
                  }
                  } style={styles.dropDownItem}>
                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="add" size={25} color={PrimaryGreenColor} />
                      <Text style={styles.greenText}>Cadastrar nova endereço</Text>
                    </View>
                  </Pressable>
                </>
              }
            </>
          }
          <View>
            {
              authContext.user != null &&
              <Pressable onPress={() => setOpenOtherLocation(!openOtherLocation)} style={styles.dropDownSelectedItem}>
                <View>
                  <Text style={styles.fontDropTitle}>Em outro lugar</Text>
                </View>
                <Ionicons name={openOtherLocation == true ? 'chevron-up' : 'chevron-down'} size={25} color={PrimaryGreenColor} />
              </Pressable>
            }
            {
              openOtherLocation == true &&
              <View style={styles.modalInputContainer}>
                <View style={{ width: '65%' }}>
                  <Input
                    error={inputCepError}
                    label="Código de Endereçamento Postal"
                    style={{ width: '100%' }}
                    onChangeText={(value) => {
                      setInputCepValue(value)
                      setInputCepError(false)
                    }}
                    messageError={cepMessageError}
                    value={inputCepValue} />
                </View>
                <View style={{ marginLeft: 15, flex: 1, alignItems: 'baseline', justifyContent: 'center', flexDirection: 'column' }}>
                  <PrimaryButton
                    style={{ width: 100, height: 50 }}
                    activeStyle={true}
                    onPress={() => handleCep()}
                    label='Usar'
                  />
                </View>
              </View>
            }

          </View>


          <View style={styles.buttomContainerModal}>
            {
              authContext.user &&
              <>
                <PrimaryButton
                  style={{ width: 180, height: 50 }}
                  activeStyle={false}
                  onPress={() => setAddressModalIsVisible(false)}
                  label='Cancelar'
                />
                <PrimaryButton
                  style={{ width: 180, height: 50 }}
                  activeStyle={true}
                  onPress={() => {
                    if (selectedAddress) {
                      authContext.setDefaultAddressLocalStorage(selectedAddress)
                      setAddressModalIsVisible(false)
                    }
                  }}
                  label='Salvar alterações'
                />
              </>
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: WhiteColor,
    flex: 1,
    position: 'absolute',
    zIndex: 25,
    width: '100%',
    height: '100%'
  },
  goBackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GreenLight,
    marginBottom: 20,
    width: '100%',
    paddingTop: 20,
    height: 75,
    paddingHorizontal: 20
  },
  addressItem: {
    padding: 10,
    gap: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  buttomContainerModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 40
  },
  modalInputContainer: {
    flexDirection: 'row',
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: GreenLight,
    gap: 10
  },
  modalTitle: {
    fontSize: 20,
    paddingLeft: 20
  },
  goBackText: {
    marginLeft: 15,
    fontSize: 18
  },
  dropDownItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgb(211, 211, 211)',
    paddingHorizontal: 15,
    backgroundColor: '#ececec'
  },
  dropDownSelectedItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgb(211, 211, 211)',
    paddingHorizontal: 15
  },
  fontDropTitle: {
    fontSize: 18
  },
  greenText: {
    color: PrimaryGreenColor
  }
});