import { View, StyleSheet } from "react-native";
import { MyAnnouncementsProvider } from "./contexts";
import { LeftBar } from "./components/LeftBar";
import { RightContent } from "./components/RightContent";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";

/**
 * MyAnnouncements
 */

export default function MyAnnouncements() {
  return (
    <MyAnnouncementsProvider>
      <ResponsiveNavbar>
        <View style={styles.container}>
          <LeftBar />
          <RightContent />
        </View>
      </ResponsiveNavbar>
    </MyAnnouncementsProvider>
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    flexDirection: 'row',
  },
});