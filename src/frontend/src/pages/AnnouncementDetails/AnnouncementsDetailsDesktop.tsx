import { useState, useContext } from 'react'
import { useNavigation } from "@react-navigation/native"
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from "react-native"
import { StackTypes } from "../../routes/StackTypes"
import { DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../../common/theme/colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { avaliableText } from "../../common/utils/annoucementsUtils"
import { getValueRent, getValueSale } from '../../common/utils/annoucementsUtils'
import PrimaryButton from '../../common/components/PrimaryButton'
import Carousel from '../../common/components/Carousel'
import { CleanAnnouncementView } from '../../types/CleanAnnouncementView'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import Ratings from './Ratings'
import Input from '../../common/components/Input'
import { rentService } from '../../services/rentService'
import { NegotiationForm } from '../../types/NegotiationForm'
import { tradeService } from '../../services/tradeService'
import { saleService } from '../../services/saleService'
import { RentView } from '../../types/RentView'
import { TradeView } from '../../types/TradeView'
import { SaleView } from '../../types/SaleView'

export default function AnnouncementsDetailsDesktop({ announcement }: { announcement: CleanAnnouncementView }) {
  const authContext = useContext(AuthContext)
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<StackTypes>()
  Dimensions.addEventListener('change', () => {
    setIsVisible(false)
  })

  const [openRatings, setOpenRatings] = useState(false)
  const [inputDaysRent, setInputDaysRent] = useState("1")
  const [inputDaysError, setInputDaysError] = useState(false)
  const [daysMessageError, setDaysMessageError] = useState("Insira uma quantidade de dias em número válida")
  const [rentButtomActive, setRentButtomActive] = useState(false)
  const [saleButtomActive, setSaleButtomActive] = useState(false)
  const [tradeButtomActive, setTradeButtomActive] = useState(false)
  const [totalValueNegotiation, setTotalValueNegotiation] = useState(0.0)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorOwnAd, setErrorOwnAd] = useState(false)

  const handleButtonActive = (name: string) => {
    if (name == "rent") {
      setRentButtomActive(true)
      setSaleButtomActive(false)
      setTradeButtomActive(false)
      if (announcement.valueForRent != null && validateInput(inputDaysRent)) setTotalValueNegotiation(announcement.valueForRent * parseInt(inputDaysRent))
    }
    if (name == "sale") {
      setRentButtomActive(false)
      setSaleButtomActive(true)
      setTradeButtomActive(false)
      if (announcement.valueForSale != null) setTotalValueNegotiation(announcement.valueForSale)
    }
    if (name == "trade") {
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
        setIsVisible(false)
        setLoading(false)
        navigation.navigate("Chat", { chatId: rent.chat.id })
      }).catch(() => {
        setLoading(false)
        setError(true)
      })
    }
    if (tradeButtomActive == true) {
      console.log("entrou")
      setLoading(true)
      await tradeService.create(negotiation).then((data) => {
        const trade: TradeView = data.data
        setIsVisible(false)
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
        setIsVisible(false)
        setLoading(false)
        navigation.navigate("Chat", { chatId: sale.chat.id })
      }).catch(() => {
        setLoading(false)
        setError(true)
      })
    }


  }

  return (
    <>
      {
        openRatings == true &&
        <Ratings announcement={announcement} openRatings={openRatings} setOpenRatings={setOpenRatings} />
      }

      <Modal transparent={true} onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)} style={{ flex: 1, width: '100%', height: '100%', }}>
          <View style={styles.modalView}>
            {loading &&
              <View style={[{
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 30,
                width: 750,
                height: 450,
                position: 'absolute',
                justifyContent: 'center',
                borderRadius: 5,
                alignSelf: 'center'
              }]}>
                <ActivityIndicator size="large" color={GreenLight} />
              </View>
            }
            <Pressable>
              <View style={styles.modalWindow}>

                <View>
                  <Pressable onPress={() => { setIsVisible(false) }} style={{ marginBottom: 40, flexDirection: 'row', alignItems: 'center', gap: 15, width: 640 }} >
                    <Ionicons name='arrow-back' size={35} color={PrimaryGreenColor} />
                    <Text style={{ fontSize: 25 }}>Criar negociação</Text>
                  </Pressable>
                  <Text style={{ fontSize: 18 }}>Selecione o tipo da negociação:</Text>
                  <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, justifyContent: 'center', marginBottom: 20 }}>

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
                    <View style={styles.modalInputContainer}>
                      <View style={{ width: '100%' }}>
                        <Input
                          error={inputDaysError}
                          label="Quantidade de dias para aluguel"
                          style={{ width: '100%' }}
                          onChangeText={(value) => {
                            setInputDaysRent(value)
                            handleDays(value)
                          }}
                          messageError={daysMessageError}
                          value={inputDaysRent} />
                      </View>
                    </View>
                  }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 40, alignItems: 'center' }}>
                  <Text style={{ fontSize: 25, color: PrimaryGreenColor }}>Total: R${totalValueNegotiation.toFixed(2)}</Text>
                  <PrimaryButton
                    onPress={() => { handleNegotiation() }}
                    style={styles.buttom}
                    label='Confirmar'
                  />

                </View>
                {
                  error &&
                  <Text style={{ color: "red" }}>Não foi possível realizar a operação. Tente novamente mais tarde.</Text>
                }


              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.window}>
            <Pressable onPress={() => navigation.goBack()}>
              <View style={styles.goBackContainer} >
                <Ionicons name='arrow-back' size={35} color={DarkGreen} />
                <Text style={styles.goBackText}>Voltar</Text>
              </View>

            </Pressable>
            <View style={styles.whiteWindow}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={styles.carouselContainer}>
                  <Carousel size={450} listImages={announcement.images} />
                </View>
                <View style={styles.infosContainer}>
                  <View style={styles.locationContainer}>
                    <Ionicons name='location' size={18} color={DarkGreen} />
                    <Text>{announcement.location.city}/{announcement.location.state}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                    <Text style={styles.title}>{announcement.book.title}</Text>
                  </View>

                  <Pressable onPress={() => {
                    if (announcement.totalRatings != 0) {
                      setOpenRatings(true)
                    }
                  }} style={styles.ratingContainer}>
                    <Text>{announcement.averageStars}</Text>
                    <View style={styles.starsContainer}>
                      <Ionicons name={announcement.averageStars >= 1 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
                      <Ionicons name={announcement.averageStars >= 2 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
                      <Ionicons name={announcement.averageStars >= 3 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
                      <Ionicons name={announcement.averageStars >= 4 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
                      <Ionicons name={announcement.averageStars >= 5 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
                    </View>
                    <Text>({announcement.totalRatings})</Text>
                  </Pressable>
                  {announcement.isAvailable == true &&
                    <>
                      {
                        announcement.rent &&
                        <View >
                          <Text style={styles.text}>Alugar</Text>
                          <Text style={styles.priceText}>{getValueRent(announcement)}</Text>
                        </View>
                      }
                      {
                        announcement.sale &&
                        <View>
                          <Text style={styles.text}>Comprar</Text>
                          <Text style={styles.priceText}>{getValueSale(announcement)}</Text>
                        </View>
                      }
                      <View style={styles.available}>
                        <Ionicons name="checkmark-circle" size={20} style={{ color: PrimaryGreenColor }} />
                        <Text style={styles.availableText}>{avaliableText(announcement)}</Text>
                      </View>
                      <View style={{ gap: 20, marginTop: 20 }}>
                        <PrimaryButton
                          onPress={() => {
                            if (authContext.user != null) {
                              if (announcement.ownerUser.id == authContext.user.id) {
                                setErrorOwnAd(true)
                              } else {
                                setIsVisible(true)
                              }
                            }
                            else {
                              navigation.navigate('Entrar', {})
                            }
                          }}
                          style={styles.buttom}
                          label='Negociar'
                        />
                        {
                          errorOwnAd &&
                          <Text style={{ color: "red" }}>Não é possível negociar em seu próprio anúncio.</Text>
                        }

                      </View>
                    </>
                  }
                  {
                    announcement.isAvailable == false &&
                    <Text style={[{ marginBottom: 20 }, styles.priceText]}>Este anúncio não está diponível para negociação no momento</Text>
                  }

                </View>
              </View>
              <View style={{ marginTop: 20, gap: 10, padding: 40 }}>

                {
                  announcement.description &&
                  <View style={{ marginBottom: 40 }}>
                    <Text style={styles.text}>Descrição do anúncio:</Text>
                    <Text>{announcement.description}</Text>
                  </View>
                }

                <Text style={styles.text}>Informações sobre o livro</Text>

                {
                  announcement.book.authors != null && announcement.book.authors[0] != null &&
                  <Text><Text style={styles.greenText}>Autor: </Text>{announcement.book.authors}</Text>
                }
                {
                  announcement.book.publishedDate != null &&
                  <Text><Text style={styles.greenText}>Data de publicação: </Text>{announcement.book.publishedDate}</Text>
                }
                {
                  announcement.book.description != null &&
                  <Text><Text style={styles.greenText}>Descrição do livro: </Text>{announcement.book.description}</Text>
                }
                {
                  announcement.book.pageCount != null &&
                  <Text><Text style={styles.greenText}>Número de páginas: </Text>{announcement.book.pageCount}</Text>
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1DCC5",
    flex: 1
  },
  window: {
    flex: 1,
    width: '85%',
    height: '100%',
    marginTop: 20,
    alignSelf: 'center'
  },
  goBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: 100
  },
  goBackText: {
    marginLeft: 15,
    fontSize: 18
  },
  whiteWindow: {
    backgroundColor: WhiteColor,
    height: '100%'
  },
  carouselContainer: {
    width: 520, marginTop: 40
  },
  text: {
    fontSize: 24,
    color: DarkGreen,
  },
  priceText: {
    fontSize: 35,
    color: PrimaryGreenColor
  },
  infosContainer: {
    gap: 10,
    marginLeft: 40,
    marginTop: 40,
    flex: 1
  },
  title: {
    fontSize: 30,
    color: DarkGreen,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 10, alignItems: 'center'
  },
  buttom: {
    height: 60,
    width: 200
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 5
  },
  starsContainer: {
    flexDirection: 'row',
  },
  modalView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWindow: {
    width: 750,
    height: 450,
    backgroundColor: WhiteColor,
    borderRadius: 5,
    padding: 40,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between'
  },
  available: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center'
  },
  availableText: {
    marginLeft: 5
  },
  greenText: {
    color: DarkGreen
  },
  modalInputContainer: {
    flexDirection: 'row'
  }
})