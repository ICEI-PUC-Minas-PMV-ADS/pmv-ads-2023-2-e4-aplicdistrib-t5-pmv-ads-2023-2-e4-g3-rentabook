import { useState, useContext } from 'react'
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { AppParamsList } from "../../routes/AppParamsList"
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar"
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, SafeAreaView } from "react-native"
import { StackTypes } from "../../routes/StackTypes"
import { Desktop } from "../../hooks/useResposive"
import { DarkGreen, PrimaryGreenColor, WhiteColor } from "../../common/theme/colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { avaliableText } from "../../common/utils/annoucementsUtils"
import { getValueRent, getValueSale } from '../../common/utils/annoucementsUtils'
import PrimaryButton from '../../common/components/PrimaryButton'
import Carousel from '../../common/components/Carousel'
import { CleanAnnouncementView } from '../../types/CleanAnnouncementView'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import Ratings from './Ratings'

export default function AnnouncementsDetailsDesktop({ announcement }: { announcement: CleanAnnouncementView }) {
  const authContext = useContext(AuthContext)
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<StackTypes>()
  Dimensions.addEventListener('change', () => {
    setIsVisible(false)
  })

  const [openRatings, setOpenRatings] = useState(false)




  return (
    <>
      {
        openRatings == true &&
        <Ratings announcement={announcement} openRatings={openRatings} setOpenRatings={setOpenRatings} />
      }

      <Modal transparent={true} onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)} style={{ flex: 1, width: '100%', height: '100%', }}>
          <View style={styles.modalView}>
            <Pressable>
              <View style={styles.modalWindow}>
                <Text style={styles.goBackText}>Selecione o tipo da negociação</Text>
                <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, justifyContent: 'center' }}>
                  {
                    announcement.rent == true &&
                    <PrimaryButton
                      onPress={() => { setIsVisible(true) }}
                      style={styles.buttom}
                      label='Aluguel'
                    />
                  }
                  {
                    announcement.sale == true &&
                    <PrimaryButton
                      onPress={() => { setIsVisible(true) }}
                      style={styles.buttom}
                      label='Compra'
                    />
                  }
                  {
                    announcement.trade == true &&
                    <PrimaryButton
                      onPress={() => { setIsVisible(true) }}
                      style={styles.buttom}
                      label='Troca'
                    />
                  }
                </View>
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
                      <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
                        <PrimaryButton
                          onPress={() => {
                            if (authContext.user != null) {
                              setIsVisible(true)
                            }
                            else {
                              navigation.navigate('Entrar', {})
                            }
                          }}
                          style={styles.buttom}
                          label='Negociar'
                        />
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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
    justifyContent: 'center'

  },
  modalWindow: {
    alignSelf: 'center',
    width: 750,
    backgroundColor: WhiteColor,
    borderRadius: 3,
    position: 'absolute',
    padding: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15
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
  }
})