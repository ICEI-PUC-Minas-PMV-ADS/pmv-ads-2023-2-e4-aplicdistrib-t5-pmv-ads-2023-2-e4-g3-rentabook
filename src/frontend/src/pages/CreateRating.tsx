import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, ActivityIndicator } from "react-native";
import { GreenLight, DarkGreen, WhiteColor, GreyColor, PrimaryGreenColor } from "../common/theme/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { isDesktop } from "../hooks/useResposive";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackTypes } from "../routes/StackTypes";
import PrimaryButton from "../common/components/PrimaryButton";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import TextArea from "../common/components/TextArea";
import { ratingService } from "../services/ratingService";
import { RatingForm } from "../types/RatingForm";
import { AppParamsList } from "../routes/AppParamsList";



export default function CreateRating() {

  const navigation = useNavigation<StackTypes>()
  const route = useRoute<RouteProp<AppParamsList, 'Avalie a negociação'>>()

  const negotiation = route.params.negotiation
  const idNegotiation = route.params.idNegotiation

  const [star1, setStar1] = useState(false)
  const [star2, setStar2] = useState(false)
  const [star3, setStar3] = useState(false)
  const [star4, setStar4] = useState(false)
  const [star5, setStar5] = useState(false)
  const [error, setError] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | undefined>(undefined)

  const handleStar = (item: string) => {
    if (item == "star1") {
      setError(false)
      setStar1(true)
      setStar2(false)
      setStar3(false)
      setStar4(false)
      setStar5(false)
    } else if (item == "star2") {
      setError(false)
      setStar1(true)
      setStar2(true)
      setStar3(false)
      setStar4(false)
      setStar5(false)
    } else if (item == "star3") {
      setError(false)
      setStar1(true)
      setStar2(true)
      setStar3(true)
      setStar4(false)
      setStar5(false)
    } else if (item == "star4") {
      setError(false)
      setStar1(true)
      setStar2(true)
      setStar3(true)
      setStar4(true)
      setStar5(false)
    } else if (item == "star5") {
      setError(false)
      setStar1(true)
      setStar2(true)
      setStar3(true)
      setStar4(true)
      setStar5(true)
    }
  }

  const handleStars = () => {
    if (star5 == true) return 5
    else if (star4 == true) return 4
    else if (star3 == true) return 3
    else if (star2 == true) return 2
    else if (star1 == true) return 1
    else return 1
  }

  const handleRating = async () => {
    if (star1 != true) {
      setError(true)
      setMessageError("É necessario selecionar uma quantidade de estrelas")
    } else {
      setLoading(true)
      const rating: RatingForm = {
        idNegotiation: idNegotiation,
        negotiation: negotiation,
        stars: handleStars(),
        message: message == undefined ? null : message
      }
      await ratingService.createRating(rating).then(data => {
        setLoading(false)
        navigation.goBack()
      }).catch(e => {
        if (e.response.status == 409) {
          setLoading(false)
          setError(true)
          setMessageError("Você já avaliou essa negociação!")
        }
        else if (e.response.status == 400) {
          setLoading(false)
          setError(true)
          setMessageError("Só é possível avaliar a negociação após o seu término!")
        }
        else {
          setLoading(false)
          setError(true)
          setMessageError("Não foi possível avaliar essa negociação, tente novamente mais tarde.")
        }
      })
    }
  }

  return (
    <ResponsiveNavbar>
      <SafeAreaView style={[isDesktop() && styles.containerDesktop, !isDesktop() && styles.containerMobile]}>
        <View style={[isDesktop() && styles.goBackContainerDesktop, !isDesktop() && styles.goBackContainerMobile]}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.goBack() }}>
            <Ionicons name='arrow-back' size={35} color={DarkGreen} />
            <Text style={styles.goBackText}>Voltar</Text>
          </Pressable>
        </View>

        <View style={[isDesktop() && { width: "85%", alignSelf: 'center' }, { flex: 1, backgroundColor: WhiteColor, borderRadius: 5 }]}>
          {loading &&
            <View style={[{
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 30,
              width: '100%',
              height: '100%',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5
            }]}>
              <ActivityIndicator size="large" color={GreenLight} />
            </View>
          }
          <View style={{ padding: 40, gap: 40, alignSelf: 'center', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ gap: 40 }}>
              <Text style={{ fontSize: 35 }}>Avalie a negociação</Text>
              <View style={{ gap: 10 }}>
                <Text>Selecione a quantidade de estrelas:</Text>
                <View style={styles.starsContainer}>
                  <Pressable onPress={() => { handleStar("star1") }}>
                    <Ionicons name={star1 == true ? "star" : 'star-outline'} size={50} color={PrimaryGreenColor} />
                  </Pressable>
                  <Pressable onPress={() => { handleStar("star2") }}>
                    <Ionicons name={star2 == true ? "star" : 'star-outline'} size={50} color={PrimaryGreenColor} />
                  </Pressable>
                  <Pressable onPress={() => { handleStar("star3") }}>
                    <Ionicons name={star3 == true ? "star" : 'star-outline'} size={50} color={PrimaryGreenColor} />
                  </Pressable>
                  <Pressable onPress={() => { handleStar("star4") }}>
                    <Ionicons name={star4 == true ? "star" : 'star-outline'} size={50} color={PrimaryGreenColor} />
                  </Pressable>
                  <Pressable onPress={() => { handleStar("star5") }}>
                    <Ionicons name={star5 == true ? "star" : 'star-outline'} size={50} color={PrimaryGreenColor} />
                  </Pressable>
                </View>
              </View>
              <View style={{ width: 400 }}>
                <TextArea
                  placeholder="Digite uma mensagem (opcional)"
                  value={message}
                  onChange={(e) => {
                    setMessage(e)
                  }} />
              </View>
            </View>
            <View style={{ alignItems: 'center', gap: 10 }}>
              {
                error &&
                <Text style={{ color: "red" }}>{messageError}</Text>
              }

              <PrimaryButton label="Salvar"
                style={{ width: 400, height: 50 }}
                onPress={() => { handleRating() }}
              />

            </View>

          </View>
        </View>
      </SafeAreaView>
    </ResponsiveNavbar>
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
  goBackText: {
    marginLeft: 15,
    fontSize: 18
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});