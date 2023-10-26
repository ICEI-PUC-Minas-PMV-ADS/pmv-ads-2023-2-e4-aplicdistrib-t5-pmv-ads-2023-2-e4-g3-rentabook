import { useContext, useState } from 'react'
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { AppParamsList } from "../../routes/AppParamsList"
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar"
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TouchableWithoutFeedback, SafeAreaView } from "react-native"
import { StackTypes } from "../../routes/StackTypes"
import { Desktop } from "../../hooks/useResposive"
import { DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../../common/theme/colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { avaliableText } from "../../common/utils/annoucementsUtils"
import { getValueRent, getValueSale } from '../../common/utils/annoucementsUtils'
import PrimaryButton from '../../common/components/PrimaryButton'
import Carousel from '../../common/components/Carousel'
import { CleanAnnouncementView } from '../../types/CleanAnnouncementView'
import { lightGreen } from '@mui/material/colors'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export default function AnnouncementsDetailsMobile({ announcement }: { announcement: CleanAnnouncementView }) {
  const navigation = useNavigation<StackTypes>()
  const [isVisible, setIsVisible] = useState(false);
  const authContext = useContext(AuthContext)

  const style = StyleSheet.create({
    container: {
      backgroundColor: "#E1DCC5",
      flex: 1,
    },
    goBackContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: GreenLight,
      marginBottom: 20,
      width: '100%',
      height: 65,
      paddingHorizontal: 20
    },
    goBackText: {
      marginLeft: 15,
      fontSize: 18
    },
    carouselContainer: {
      width: '100%'
    },
    text: {
      fontSize: 24,
      color: DarkGreen,
    },
    priceText: {
      fontSize: 30,
      color: PrimaryGreenColor
    },
    notText: {
      fontSize: 22,
      color: PrimaryGreenColor
    },
    infosContainer: {
      padding: 20,
      gap: 20
    },
    title: {
      fontSize: 30,
      color: DarkGreen,
    },
    locationContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    },
    buttom: {
      height: 65,
      width: 300
    },
    buttomContainer: {
      flexDirection: 'row', marginTop: 20, width: '100%', justifyContent: 'center'
    },
    ratingContainer: {
      flexDirection: 'row',
      gap: 5
    },
    starsContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    locationStars: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 20,

    },
    modalWindow: {
      alignSelf: 'center',
      width: "90%",
      backgroundColor: WhiteColor,
      borderRadius: 3,
      position: 'absolute',
      padding: 20,
      flexDirection: 'column',
      gap: 15,
      top: 250
    },
    buttomModalContainer: {
      flexDirection: 'column',
      gap: 20,
      alignItems: 'center'
    },
    available: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    availableText: {
      marginLeft: 5
    },
    greenText: {
      color: DarkGreen
    }
  })

  return (
    <SafeAreaView style={style.container}>
      <Modal transparent={true} onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)} style={{ flex: 1, width: '100%', height: '100%', }}>
          <View style={style.modalView}>
            <Pressable>
              <View style={style.modalWindow}>
                <Text style={style.goBackText}>Selecione o tipo da negociação</Text>
                <View style={{ flexDirection: 'column', gap: 20, marginTop: 20, alignItems: 'center', marginBottom: 20 }}>
                  {
                    announcement.rent == true &&
                    <PrimaryButton
                      onPress={() => { setIsVisible(true) }}
                      style={style.buttom}
                      label='Aluguel'
                    />
                  }
                  {
                    announcement.sale == true &&
                    <PrimaryButton
                      onPress={() => { setIsVisible(true) }}
                      style={style.buttom}
                      label='Compra'
                    />
                  }
                  {
                    announcement.trade == true &&
                    <PrimaryButton
                      onPress={() => { setIsVisible(true) }}
                      style={style.buttom}
                      label='Troca'
                    />
                  }
                </View>
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={style.goBackContainer} >
            <Ionicons name='arrow-back' size={35} color={DarkGreen} />
            <Text style={style.goBackText}>Voltar</Text>
          </View>

        </Pressable>
        <View style={style.infosContainer}>
          <View style={style.locationStars}>
            <View style={style.locationContainer}>
              <Ionicons name='location' size={18} color={DarkGreen} />
              <Text>{announcement.location.city}/{announcement.location.state}</Text>
            </View>
            <View style={style.ratingContainer}>
              <Text>4.0</Text>
              <View style={style.starsContainer}>
                <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                <Ionicons name='star-outline' size={18} color={PrimaryGreenColor} />
              </View>
              <Text>(11)</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            <Text style={style.title}>{announcement.book.title}</Text>
          </View>
          {
            announcement.images != null &&
            <>
              <View style={style.carouselContainer}>
                <Carousel size={300} listImages={announcement.images} />
              </View>
            </>
          }
          {announcement.isAvailable == true &&
            <>
              {
                announcement.rent &&
                <View >
                  <Text style={style.text}>Alugar</Text>
                  <Text style={style.priceText}>{getValueRent(announcement)}</Text>
                </View>
              }
              {
                announcement.sale &&
                <View>
                  <Text style={style.text}>Comprar</Text>
                  <Text style={style.priceText}>{getValueSale(announcement)}</Text>
                </View>
              }
              <View style={style.available}>
                <Ionicons name="checkmark-circle" size={20} style={{ color: PrimaryGreenColor }} />
                <Text style={style.availableText}>{avaliableText(announcement)}</Text>
              </View>
              <View style={style.buttomContainer}>
                <PrimaryButton
                  onPress={() => {
                    if (authContext.user != null) {
                      setIsVisible(true)
                    }
                    else {
                      navigation.navigate('Entrar', {})
                    }
                  }}
                  style={style.buttom}
                  label='Negociar'
                />
              </View>
            </>
          }
          {
            announcement.isAvailable == false &&
            <Text style={[{ marginBottom: 20 }, style.notText]}>Este anúncio não está diponível para negociação no momento</Text>
          }

          <View style={{ marginTop: 20, gap: 10 }}>

            {
              announcement.description &&
              <View style={{ marginBottom: 40 }}>
                <Text style={style.text}>Descrição do anúncio:</Text>
                <Text>{announcement.description}</Text>
              </View>
            }

            <Text style={style.text}>Informações sobre o livro</Text>

            {
              announcement.book.authors != null && announcement.book.authors[0] != null &&
              <Text><Text style={style.greenText}>Autor: </Text>{announcement.book.authors}</Text>
            }
            {
              announcement.book.publishedDate != null &&
              <Text><Text style={style.greenText}>Data de publicação: </Text>{announcement.book.publishedDate}</Text>
            }
            {
              announcement.book.description != null &&
              <Text><Text style={style.greenText}>Descrição do livro: </Text>{announcement.book.description}</Text>
            }
            {
              announcement.book.pageCount != null &&
              <Text><Text style={style.greenText}>Número de páginas: </Text>{announcement.book.pageCount}</Text>
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

