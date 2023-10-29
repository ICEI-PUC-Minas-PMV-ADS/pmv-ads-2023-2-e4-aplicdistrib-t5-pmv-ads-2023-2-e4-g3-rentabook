import { View, StyleSheet, Pressable, FlatList, Dimensions } from "react-native"
import { useRef, useState } from 'react'
import { DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../theme/colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { getImageLink } from "../utils/annoucementsUtils";




export default function Carousel({ size, listImages }: { size: number, listImages: string[] }) {
  const images = listImages[0] == null ? ["imagempadrao"] : listImages
  const flatListRef = useRef<FlatList<string> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const arrowRight: boolean = images.length - 1 == currentIndex || images.length == 0
  const windowWidth = Dimensions.get("window").width;

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

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index)
    flatListRef.current?.scrollToOffset({
      offset: index * windowWidth,
    });
  }

  const renderImage = (item: string) => {
    return (
      <View key={item} style={{
        flex: 1
      }}>
        <Image source={getImageLink(item)} style={[style.image]} />
      </View >
    )
  }

  const style = StyleSheet.create({
    image: {
      width: size,
      height: size,
      borderRadius: 5
    },
    carouselContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    arrowCaroulsel: {
      width: 35,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <View style={style.carouselContainer}>
      <Pressable onPress={() => scrollToPrev()} style={[currentIndex == 0 && { opacity: 0 }, style.arrowCaroulsel]}>
        <Ionicons name='chevron-back' size={35} color={DarkGreen} />
      </Pressable>
      <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        {
          images != null &&
          <>
            <View style={{ width: size }}>
              <FlatList
                ref={(ref) => (flatListRef.current = ref)}
                keyExtractor={(item, index) => index.toString()}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                  const totalWidth = event.nativeEvent.layoutMeasurement.width
                  const xPosition = event.nativeEvent.contentOffset.x
                  const newIndex = Math.round(xPosition / totalWidth)
                  setCurrentIndex(newIndex)
                }}
                renderItem={({ item }) => renderImage(item)}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              {images.map((item, index) => {
                if (index == currentIndex) {
                  return (
                    <Pressable key={index} onPress={() => scrollToIndex(index)}>
                      <Ionicons name='ellipse' size={16} color={PrimaryGreenColor} />
                    </Pressable>
                  )
                }
                else {
                  return (
                    <Pressable key={index} onPress={() => scrollToIndex(index)}>
                      <Ionicons name='ellipse' size={16} color={GreenLight} />
                    </Pressable>)
                }

              })}
            </View>
          </>
        }
      </View>
      <Pressable onPress={() => scrollToNext()} style={[arrowRight && { opacity: 0 }, style.arrowCaroulsel]}>
        <Ionicons name='chevron-forward' size={35} color={DarkGreen} />
      </Pressable>
    </View>
  )
}

