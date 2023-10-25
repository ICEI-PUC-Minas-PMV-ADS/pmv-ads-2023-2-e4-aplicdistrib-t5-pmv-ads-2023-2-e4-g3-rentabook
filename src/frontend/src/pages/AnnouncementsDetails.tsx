import { useEffect, useRef, useState } from 'react'
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { AppParamsList } from "../routes/AppParamsList"
import ResponsiveNavbar from "../common/components/ResponsiveNavbar"
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions, ScrollView } from "react-native"
import { StackTypes } from "../routes/StackTypes"
import { Desktop } from "../hooks/useResposive"
import { DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../common/theme/colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { getImageLink } from "../common/utils/annoucementsUtils"
import { getValueRent, getValueSale } from '../common/utils/annoucementsUtils'
import PrimaryButton from '../common/components/PrimaryButton'
import { lightGreen } from '@mui/material/colors'

const windowWidth = Dimensions.get('window').width;




export default function AnnouncementsDetails() {
  const route = useRoute<RouteProp<AppParamsList, 'Detalhes do anúncio'>>()
  const navigation = useNavigation<StackTypes>()
  const announcement = route.params?.announcement
  const images = announcement.images

  const flatListRef = useRef<FlatList<string> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * windowWidth,
      });
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex - 1) * windowWidth,
      });
    }
  };


  const renderImage = (item: string) => {
    return (
      <View style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image source={getImageLink(item)} style={styleDesktop.image} />
      </View >
    )
  }

  return (
    <ResponsiveNavbar>
      <>
        {
          announcement == null &&
          <View>
            <Text>Anúncio não encontrado!</Text>
          </View>
        }
        {
          announcement != null &&
          <Desktop>

            <View style={styleDesktop.container}>
              <ScrollView>
                <View style={styleDesktop.window}>
                  <Pressable style={styleDesktop.goBackContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' size={35} color={DarkGreen} />
                    <Text style={styleDesktop.goBackText}>Voltar</Text>
                  </Pressable>
                  <View style={styleDesktop.whiteWindow}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <View style={styleDesktop.carouselContainer}>
                        <Pressable onPress={() => scrollToPrev()} style={{ width: 35, alignItems: 'center', justifyContent: 'center' }}>
                          <Ionicons name='chevron-back' size={35} color={DarkGreen} />
                        </Pressable>
                        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                          {
                            announcement.images != null &&
                            <>
                              <View style={{ width: 450 }}>
                                <FlatList
                                  ref={(ref) => (flatListRef.current = ref)}
                                  data={images}
                                  horizontal
                                  pagingEnabled
                                  showsHorizontalScrollIndicator={false}
                                  keyExtractor={(item) => item}
                                  renderItem={({ item }) => renderImage(item)}
                                />
                              </View>
                              <View style={{ flexDirection: 'row' }}>
                                {images.map((item, index) => {
                                  if (index == currentIndex) {
                                    return <Ionicons name='ellipse' size={16} color={PrimaryGreenColor} />
                                  }
                                  else {
                                    return <Ionicons name='ellipse' size={16} color={GreenLight} />
                                  }

                                })}
                              </View>
                            </>
                          }
                        </View>
                        <Pressable onPress={() => scrollToNext()} style={{ width: 35, alignItems: 'center', justifyContent: 'center' }}>
                          <Ionicons name='chevron-forward' size={35} color={DarkGreen} />
                        </Pressable>
                      </View>
                      <View style={styleDesktop.infosContainer}>
                        <View style={styleDesktop.locationContainer}>
                          <Ionicons name='location' size={18} color={DarkGreen} />
                          <Text>{announcement.location.city}/{announcement.location.state}</Text>
                        </View>
                        <Text style={styleDesktop.title}>{announcement.book.title}</Text>
                        <View style={styleDesktop.ratingContainer}>
                          <Text>4.0</Text>
                          <View style={styleDesktop.starsContainer}>
                            <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                            <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                            <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                            <Ionicons name='star' size={18} color={PrimaryGreenColor} />
                            <Ionicons name='star-outline' size={18} color={PrimaryGreenColor} />
                          </View>
                          <Text>(11)</Text>
                        </View>
                        {
                          announcement.rent &&
                          <View >
                            <Text style={styleDesktop.text}>Alugar</Text>
                            <Text style={styleDesktop.priceText}>{getValueRent(announcement)}</Text>
                          </View>
                        }
                        {
                          announcement.sale &&
                          <View>
                            <Text style={styleDesktop.text}>Comprar</Text>
                            <Text style={styleDesktop.priceText}>{getValueSale(announcement)}</Text>
                          </View>
                        }
                        <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
                          <PrimaryButton
                            onPress={() => { }}
                            style={styleDesktop.buttom}
                            label='Alugar'
                          />
                          <PrimaryButton
                            onPress={() => { }}
                            style={styleDesktop.buttom}
                            label='Comprar'
                          />
                          <PrimaryButton
                            onPress={() => { }}
                            style={styleDesktop.buttom}
                            label='Trocar'
                          />
                        </View>

                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Desktop>
        }
      </>
    </ResponsiveNavbar >
  )
}

const styleDesktop = StyleSheet.create({
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
  image: {
    width: 450,
    height: 450,
    borderRadius: 5
  },
  carouselContainer: {
    width: 520, flexDirection: 'row', marginTop: 40
  },
  text: {
    fontSize: 18,
    color: DarkGreen,
    flex: 1, flexWrap: 'wrap'
  },
  priceText: {
    fontSize: 35,
    color: PrimaryGreenColor
  },
  infosContainer: {
    gap: 10,
    marginLeft: 40,
    marginTop: 40
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

  }
})