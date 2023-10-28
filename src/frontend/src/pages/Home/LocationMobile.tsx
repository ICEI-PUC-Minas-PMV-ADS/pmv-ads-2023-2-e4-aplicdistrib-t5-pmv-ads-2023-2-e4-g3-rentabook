import { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import { GreenLight, GreyColor, PrimaryGreenColor, DarkGreen } from "../../common/theme/colors";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import PrimaryButton from "../../common/components/PrimaryButton";
import Input from "../../common/components/Input";
import { PrivateAddress } from "../../types/PrivateAddress";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LocationMobile({ selectedAddress, setSelectedAddress, inputError, setIsVisible, setInputValue, setInputError, messageError, inputValue, handleCep }: {
  selectedAddress: PrivateAddress | null,
  setSelectedAddress: React.Dispatch<React.SetStateAction<PrivateAddress | null>>,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  inputError: boolean,
  setInputError: React.Dispatch<React.SetStateAction<boolean>>,
  messageError: string,
  handleCep: () => Promise<void>,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
}) {

  const authContext = useContext(AuthContext)

  const RenderAddress = ({ item }: { item: PrivateAddress }) => {
    const [isHover, setIsHover] = useState(false)


    return (
      <Pressable onPress={() => setSelectedAddress(item)} onHoverIn={() => setIsHover(true)} onHoverOut={() => setIsHover(false)} style={[isHover && {
        backgroundColor: GreyColor
      }, styles.addressItem]}>
        {
          item.id == selectedAddress?.id &&
          <Ionicons name="radio-button-on" size={20} color={PrimaryGreenColor} />
        }
        {
          item.id != selectedAddress?.id &&
          <Ionicons name="radio-button-off" size={20} color={PrimaryGreenColor} />
        }
        <View>
          <Text>{item?.street}</Text>
          <Text>CEP:{item?.cep} - {item?.city}, {item?.state}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBackContainer}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setIsVisible(false)}>
          <Ionicons name='arrow-back' size={35} color={DarkGreen} />
          <Text style={styles.goBackText}>Voltar</Text>
        </Pressable>
        {
          authContext.defaultAddress != null &&
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
            authContext.removeDefaultAddress()
            setIsVisible(false)
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
            authContext.user &&
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.modalTitle}>Em um dos seus endereços</Text>
              <FlatList
                style={styles.modalScroll}
                data={authContext.user?.addresses}
                renderItem={({ item }) => {
                  if (item) {
                    return (<RenderAddress item={item} />)
                  }
                  else return <></>
                }
                } />
            </View>
          }
          <View>
            {
              authContext.user != null &&
              <Text style={styles.modalTitle}>Em outro lugar</Text>
            }
            <View style={styles.modalInputContainer}>
              <View style={{ width: '65%' }}>
                <Input
                  error={inputError}
                  label="Código de Endereçamento Postal"
                  style={{ width: '100%' }}
                  onChangeText={(value) => {
                    setInputValue(value)
                    setInputError(false)
                  }}
                  messageError={messageError}
                  value={inputValue} />
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
          </View>


          <View style={styles.buttomContainerModal}>
            {
              authContext.user &&
              <>
                <PrimaryButton
                  style={{ width: 180, height: 50 }}
                  activeStyle={false}
                  onPress={() => setIsVisible(false)}
                  label='Cancelar'
                />
                <PrimaryButton
                  style={{ width: 180, height: 50 }}
                  activeStyle={true}
                  onPress={() => {
                    if (selectedAddress) {
                      authContext.setDefaultAddressLocalStorage(selectedAddress)
                      setIsVisible(false)
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
    backgroundColor: "#E1DCC5",
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
  bookTexts: {
    marginLeft: 10,
    flexDirection: 'column',
    gap: 5,
    alignSelf: 'center'
  },
  bookImage: {
    height: '100%',
    width: '20%',
    borderRadius: 5
  },
  searchItem: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    padding: 5
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
    flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: 20
  },
  modalInputContainer: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: GreenLight,
    gap: 10,
    marginBottom: 20
  },
  modalScroll: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: GreenLight,
    height: 150
  },
  modalTitle: {
    fontSize: 20,
    paddingLeft: 20
  },
  goBackText: {
    marginLeft: 15,
    fontSize: 18
  },
});