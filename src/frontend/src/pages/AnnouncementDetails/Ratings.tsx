import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, ActivityIndicator } from "react-native";
import { GreenLight, PrimaryGreenColor, DarkGreen, WhiteColor, GreyColor } from "../../common/theme/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CleanAnnouncementView } from "../../types/CleanAnnouncementView";
import { ratingService } from "../../services/ratingService";
import { Page } from "../../types/Page";
import { RatingView } from "../../types/RatingView";
import { isDesktop } from "../../hooks/useResposive";

export default function Ratings({ announcement, openRatings, setOpenRatings }:
  {
    announcement: CleanAnnouncementView,
    openRatings: boolean,
    setOpenRatings: React.Dispatch<React.SetStateAction<boolean>>
  }) {
  const [ratingsResponse, setRatingsResponse] = useState<Page<RatingView> | null>(null)
  const [loading, setLoading] = useState(true)
  const [ratingsData, setRatingsData] = useState<RatingView[] | []>([])
  const [page, setPage] = useState(0)

  const loadRatings = async () => {
    if (page == 0) {
      setLoading(true)
      const data = await ratingService.getAllByAnnouncementId(announcement.id, page)
      setRatingsResponse(data)
      setRatingsData(data.content)
      setPage(page + 1)
      setLoading(false)
    }
    else {
      if (ratingsResponse?.last == false) {
        setLoading(true)
        const data = await ratingService.getAllByAnnouncementId(announcement.id, page)
        setRatingsResponse(data)
        setRatingsData([...ratingsData, ...data.content])
        setPage(page + 1)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    loadRatings()
  }, [])

  const rating = (item: RatingView) => {
    return (
      <View style={{ padding: 40, borderBottomWidth: 1, borderColor: GreenLight, gap: 10 }}>
        <View style={styles.starsContainer}>
          <Ionicons name={item.stars >= 1 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
          <Ionicons name={item.stars >= 2 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
          <Ionicons name={item.stars >= 3 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
          <Ionicons name={item.stars >= 4 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
          <Ionicons name={item.stars >= 5 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
        </View>
        <Text>
          {item.message}
        </Text>
      </View>
    )
  }

  const ratingsHeader = () => {
    return (
      <View style={{ padding: 40, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: GreenLight }}>
        <Text style={styles.modalTitle}>Opniões do livro</Text>
        <Pressable onPress={() => { }} style={styles.ratingContainer}>
          <Text style={{ fontSize: 75, color: PrimaryGreenColor }}>{announcement.averageStars}</Text>
          <View style={styles.starsContainer}>
            <Ionicons name={announcement.averageStars >= 1 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
            <Ionicons name={announcement.averageStars >= 2 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
            <Ionicons name={announcement.averageStars >= 3 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
            <Ionicons name={announcement.averageStars >= 4 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
            <Ionicons name={announcement.averageStars >= 5 ? "star" : 'star-outline'} size={18} color={PrimaryGreenColor} />
          </View>
          <Text>{announcement.totalRatings} {announcement.totalRatings == 1 ? "avaliação" : "avaliações"}</Text>
        </Pressable>
      </View>
    )
  }

  const RatingsEmpyt = () => {
    return (
      <>
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
      </>
    )
  }

  return (
    <SafeAreaView style={[isDesktop() && styles.containerDesktop, !isDesktop() && styles.containerMobile]}>
      <View style={[isDesktop() && styles.goBackContainerDesktop, !isDesktop() && styles.goBackContainerMobile]}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setOpenRatings(false)}>
          <Ionicons name='arrow-back' size={35} color={DarkGreen} />
          <Text style={styles.goBackText}>Voltar</Text>
        </Pressable>
      </View>

      <View style={[isDesktop() && { width: "85%", alignSelf: 'center' }, { flex: 1, backgroundColor: WhiteColor, borderRadius: 5 }]}>
        <RatingsEmpyt />
        <FlatList
          data={ratingsData}
          ListHeaderComponent={() => ratingsHeader()}
          renderItem={({ item }) => rating(item)}
          onEndReached={() => loadRatings()}
          onEndReachedThreshold={0.1}
        />
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
});