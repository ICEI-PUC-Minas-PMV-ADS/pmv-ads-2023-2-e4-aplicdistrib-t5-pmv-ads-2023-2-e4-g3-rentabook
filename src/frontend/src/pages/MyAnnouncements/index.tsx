import { View, StyleSheet, ScrollView } from "react-native";
import { MyAnnouncementsProvider } from "./contexts";
import { LeftBar } from "./components/LeftBar";
import { RightContent } from "./components/RightContent";
import { useMediaQuery } from "../../hooks/useResposive";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";

/**
 * MyAnnouncements
 */

export default function MyAnnouncements() {
  return (
    <MyAnnouncementsProvider>
      <ResponsiveNavbar>
        <View style={{ flex: 1, backgroundColor: "#E1DCC5", alignItems: 'center' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              {
                useMediaQuery(0, 601) && (
                  <View style={styles.desktopContainerXs}>
                    <LeftBar />
                    <RightContent />
                  </View>
                )
              }
              {
                useMediaQuery(600, 1024) && (
                  <View style={styles.desktopContainerSm}>
                    <LeftBar />
                    <RightContent />
                  </View>
                )
              }
              {
                useMediaQuery(1024, 1301) && (
                  <View style={styles.desktopContainerMd}>
                    <LeftBar />
                    <RightContent />
                  </View>
                )
              }
              {
                useMediaQuery(1301, 10000) && (
                  <View style={styles.desktopContainerLg}>
                    <LeftBar />
                    <RightContent />
                  </View>
                )
              }
            </View>
          </ScrollView>
        </View>
      </ResponsiveNavbar>
    </MyAnnouncementsProvider>
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  desktopContainerXs: {
    flex: 1,
    width: 300,
    backgroundColor: "#E1DCC5",
    marginTop: 20,
  },
  desktopContainerSm: {
    flex: 1,
    width: 600,
    backgroundColor: "#E1DCC5",
    flexDirection: 'row',
  },
  desktopContainerMd: {
    flex: 1,
    width: 920,
    backgroundColor: "#E1DCC5",
    flexDirection: 'row',
  },
  desktopContainerLg: {
    flex: 1,
    width: 1290,
    backgroundColor: "#E1DCC5",
    flexDirection: 'row',
  },
});