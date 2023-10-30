import { View, StyleSheet, Text, ScrollView } from "react-native";
import ResponsiveNavbar from "../../common/components/ResponsiveNavbar";
import { MyAnnouncementsProvider } from "./contexts";
import { LeftBar } from "./components/LeftBar";
import { RightContent } from "./components/RightContent";

/**
 * MyAnnouncements
 */

export default function MyAnnouncements() {
  return (
    <MyAnnouncementsProvider>
      <ResponsiveNavbar>
        <View style={styles.container}>
          <LeftBar />
          <ScrollView>
            <RightContent />
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
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    flexDirection: 'row',
  },
});