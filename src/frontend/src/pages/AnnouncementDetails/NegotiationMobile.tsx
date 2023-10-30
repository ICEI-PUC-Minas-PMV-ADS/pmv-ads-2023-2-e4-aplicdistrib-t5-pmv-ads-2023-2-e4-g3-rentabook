import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, ActivityIndicator } from "react-native";
import { GreenLight, PrimaryGreenColor, DarkGreen, WhiteColor, GreyColor } from "../../common/theme/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView";
import { ratingService } from "../../services/ratingService";
import { Page } from "../../types/Page";
import { RatingView } from "../../types/RatingView";
import { isDesktop } from "../../hooks/useResposive";
import { NegotiationForm } from "../../types/NegotiationForm";
import { rentService } from "../../services/rentService";
import { RentView } from "../../types/RentView";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/StackTypes";
import { tradeService } from "../../services/tradeService";
import { TradeView } from "../../types/TradeView";
import { saleService } from "../../services/saleService";
import { SaleView } from "../../types/SaleView";
import PrimaryButton from "../../common/components/PrimaryButton";
import Input from "../../common/components/Input";

export default function NegotiationMobile({ announcement, setOpenNegotiatiton }:
  {
    announcement: CleanAnnouncementView,
    setOpenNegotiatiton: React.Dispatch<React.SetStateAction<boolean>>
  }) {

  const navigation = useNavigation<StackTypes>()
  const [inputDaysRent, setInputDaysRent] = useState("1")
  const [inputDaysError, setInputDaysError] = useState(false)
  const [daysMessageError, setDaysMessageError] = useState("Insira uma quantidade de dias em número válida")
  const [rentButtomActive, setRentButtomActive] = useState(false)
  const [saleButtomActive, setSaleButtomActive] = useState(false)
  const [tradeButtomActive, setTradeButtomActive] = useState(false)
  const [totalValueNegotiation, setTotalValueNegotiation] = useState(0.0)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorNoneSelected, setErrorNoneSelected] = useState(false)

  const handleButtonActive = (name: string) => {
    if (name == "rent") {
      setErrorNoneSelected(false)
      setRentButtomActive(true)
      setSaleButtomActive(false)
      setTradeButtomActive(false)
      if (announcement.valueForRent != null && validateInput(inputDaysRent)) setTotalValueNegotiation(announcement.valueForRent * parseInt(inputDaysRent))
    }
    if (name == "sale") {
      setErrorNoneSelected(false)
      setRentButtomActive(false)
      setSaleButtomActive(true)
      setTradeButtomActive(false)
      if (announcement.valueForSale != null) setTotalValueNegotiation(announcement.valueForSale)
    }
    if (name == "trade") {
      setErrorNoneSelected(false)
      setRentButtomActive(false)
      setSaleButtomActive(false)
      setTradeButtomActive(true)
      setTotalValueNegotiation(0)
    }
  }

  const validateInput = (value: string) => {
    const regex = /^\d+$/;
    if (value == "") {
      setInputDaysError(true)
      setDaysMessageError("O campo não pode estar vazio")
      return false
    }
    else if (!regex.test(value) && value != "") {
      setInputDaysError(true)
      setDaysMessageError("Digite um número de dias inteiros válido")
      return false
    } else return true
  }

  const handleDays = (value: string) => {
    const num = parseInt(value)
    setInputDaysError(false)
    if (validateInput(value) && announcement.valueForRent != null) setTotalValueNegotiation(announcement.valueForRent * num)
  }

  const handleNegotiation = async () => {
    const negotiation: NegotiationForm = {
      announcementId: announcement.id,
      value: totalValueNegotiation
    }
    if (rentButtomActive == true && validateInput(inputDaysRent)) {
      setLoading(true)
      await rentService.create(negotiation).then((data) => {
        const rent: RentView = data.data
        setOpenNegotiatiton(false)
        setLoading(false)
        navigation.navigate("Chat", { chatId: rent.chat.id })
      }).catch(() => {
        setLoading(false)
        setError(true)
      })
    }
    if (tradeButtomActive == true) {
      setLoading(true)
      await tradeService.create(negotiation).then((data) => {
        const trade: TradeView = data.data
        setOpenNegotiatiton(false)
        setLoading(false)
        navigation.navigate("Chat", { chatId: trade.chat.id })
      }).catch(() => {
        setLoading(false)
        setError(true)
      })
    }
    if (saleButtomActive == true) {
      setLoading(true)
      await saleService.create(negotiation).then((data) => {
        const sale: SaleView = data.data
        setOpenNegotiatiton(false)
        setLoading(false)
        navigation.navigate("Chat", { chatId: sale.chat.id })
      }).catch(() => {
        setLoading(false)
        setError(true)
      })
    }
    else setErrorNoneSelected(true)
  }

  return (
    <SafeAreaView style={styles.containerMobile}>
      <View style={styles.goBackContainerMobile}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpenNegotiatiton(false)}>
          <Ionicons name='arrow-back' size={35} color={DarkGreen} />
          <Text style={styles.goBackText}>Voltar</Text>
        </Pressable>
      </View>
      {loading &&
        <View style={[{
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 30,
          width: "100%",
          height: "100%",
          position: 'absolute',
          justifyContent: 'center',
          borderRadius: 5,
          alignSelf: 'center'
        }]}>
          <ActivityIndicator size="large" color={GreenLight} />
        </View>
      }
      <View style={{ padding: 20, justifyContent: 'space-between', flex: 1 }}>
        <View>
          <Text style={{ fontSize: 18 }}>Selecione o tipo da negociação:</Text>
          <View style={{ gap: 20, marginTop: 20, justifyContent: 'center', marginBottom: 20, alignItems: 'center' }}>
            {
              announcement.rent == true &&
              <PrimaryButton
                onPress={() => { handleButtonActive("rent") }}
                style={styles.buttom}
                label='Aluguel'
                radioButtom={true}
                activeStyle={rentButtomActive}
                radioButtomOn={rentButtomActive}
              />
            }
            {
              announcement.sale == true &&
              <PrimaryButton
                onPress={() => { handleButtonActive("sale") }}
                style={styles.buttom}
                label='Compra'
                radioButtom={true}
                activeStyle={saleButtomActive}
                radioButtomOn={saleButtomActive}
              />
            }
            {
              announcement.trade == true &&
              <PrimaryButton
                onPress={() => { handleButtonActive("trade") }}
                style={styles.buttom}
                label='Troca'
                activeStyle={tradeButtomActive}
                radioButtom={true}
                radioButtomOn={tradeButtomActive}
              />
            }
          </View>
          {
            rentButtomActive &&
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Input
                error={inputDaysError}
                label="Quantidade de dias para aluguel"
                style={{ width: '80%' }}
                onChangeText={(value) => {
                  setInputDaysRent(value)
                  handleDays(value)
                }}
                messageError={daysMessageError}
                value={inputDaysRent} />
            </View>
          }
        </View>
        <View style={{ gap: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: PrimaryGreenColor }}>Total: R${totalValueNegotiation.toFixed(2)}</Text>
          <PrimaryButton
            onPress={() => { handleNegotiation() }}
            style={styles.buttom}
            label='Confirmar'
          />
          {
            error &&
            <Text style={{ color: "red" }}>Não foi possível realizar a operação. Tente novamente mais tarde.</Text>
          }
          {
            errorNoneSelected &&
            <Text style={{ color: "red" }}>Selecione um tipo de negociação.</Text>
          }
        </View>

      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  containerMobile: {
    backgroundColor: WhiteColor,
    flex: 1,
    position: 'absolute',
    zIndex: 25,
    width: '100%',
    height: '100%'
  },
  containerDesktop: {
    backgroundColor: GreyColor,
    flex: 1,
    position: 'absolute',
    zIndex: 25,
    width: '100%',
    top: 84,
    height: '88.6%'
  },
  goBackContainerMobile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GreenLight,
    width: '100%',
    paddingTop: 20,
    height: 75,
    paddingHorizontal: 20
  },
  goBackContainerDesktop: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    height: 75
  },
  modalTitle: {
    fontSize: 25,
  },
  goBackText: {
    marginLeft: 15,
    fontSize: 18
  },
  ratingContainer: {
    gap: 5,
    alignItems: 'flex-end'
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 20,

  },
  buttom: {
    height: 60,
    width: 300
  }
})