import { RouteProp, useRoute } from "@react-navigation/native"
import { AppParamsList } from "../../routes/AppParamsList"
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar"
import { View, Text } from "react-native"
import AnnouncementsDetailsDesktop from './AnnouncementsDetailsDesktop'
import { Desktop, MobileAndTablet } from "../../hooks/useResposive"
import AnnouncementsDetailsMobile from "./AnnouncementsDetailsMobile"

export default function AnnouncementsDetails() {
  const route = useRoute<RouteProp<AppParamsList, 'Detalhes do anúncio'>>()
  const announcement = route.params?.announcement
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
          <>
            <Desktop>
              <AnnouncementsDetailsDesktop announcement={announcement} />
            </Desktop>
            <MobileAndTablet>
              <AnnouncementsDetailsMobile announcement={announcement} />
            </MobileAndTablet>
          </>
        }
      </>
    </ResponsiveNavbar >
  )
}