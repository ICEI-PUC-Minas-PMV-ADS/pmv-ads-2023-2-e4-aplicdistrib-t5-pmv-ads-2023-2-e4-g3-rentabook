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
import { AuthContext } from '../../contexts/Auth/AuthContext'
import Ratings from './Ratings'
import NegotiationMobile from './NegotiationMobile'

export default function AnnouncementsDetailsMobile({ announcement }: { announcement: CleanAnnouncementView }) {
  const navigation = useNavigation<StackTypes>()
  const authContext = useContext(AuthContext)
  const [openRatings, setOpenRatings] = useState(false)
  const [openNegotiation, setOpenNegotiation] = useState(false)
  const [errorOwnAd, setErrorOwnAd] = useState(false)


  return (
    <>
      {
        openRatings == true &&
        <Ratings announcement={announcement} openRatings={openRatings} setOpenRatings={setOpenRatings} />
      }
      {
        openNegotiation == true &&
        <NegotiationMobile announcement={announcement} setOpenNegotiatiton={setOpenNegotiation} />
      }
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.goBackContainer} >
              <Ionicons name='arrow-back' size={35} color={DarkGreen} />
              <Text style={styles.goBackText}>Voltar</Text>
            </View>

          </Pressable>
          <View style={styles.infosContainer}>
            <View style={styles.locationStars}>
              <View style={styles.locationContainer}>
                <Ionicons name='location' size={18} color={DarkGreen} />
                <Text>{announcement.location.city}/{announcement.location.state}</Text>
              </View>
              <Pressable onPress={() => {
                if (announcement.totalRatings > 0) {
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
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
              <Text style={styles.title}>{announcement.book.title}</Text>
            </View>
            {
              announcement.images != null &&
              <>
                <View style={styles.carouselContainer}>
                  <Carousel size={300} listImages={announcement.images} />
                </View>
              </>
            }
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
                <View style={styles.buttomContainer}>
                  <PrimaryButton
                    onPress={() => {
                      if (authContext.user != null) {

                        if (announcement.ownerUser.id == authContext.user.id) {
                          setErrorOwnAd(true)
                        } else {
                          setOpenNegotiation(true)
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
              <Text style={[{ marginBottom: 20 }, styles.notText]}>Este anúncio não está diponível para negociação no momento</Text>
            }

            <View style={{ marginTop: 20, gap: 10 }}>

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
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
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
    paddingTop: 20,
    height: 75,
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
    marginTop: 20, width: '100%', alignItems: 'center'
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