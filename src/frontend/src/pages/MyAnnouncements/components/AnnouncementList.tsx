import * as React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { CleanAnnouncementView } from "../../../types/CleanAnnouncementView";
import { AnnouncementView } from "./AnnouncementView";
import { useMediaQuery } from "../../../hooks/useResposive";
import { useMyAnnouncementsContext } from "../contexts";
import { PrimaryGreenColor } from '../../../common/theme/colors';

/**
 * AnnouncementListProps
 */

type AnnouncementListProps = {
  loading: boolean,
  loadMoreAnnouncements: () => void,
  announcements: CleanAnnouncementView[],
};

/**
 * AnnouncementList
 */

export function AnnouncementList({ loading, loadMoreAnnouncements, announcements }: AnnouncementListProps) {
  const [fetchMoreData, setFetchMoreData] = React.useState(false);
  const { state } = useMyAnnouncementsContext();

  const loaderFooter = () => {
    if (state.hasMoreData == false) return <></>
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color={PrimaryGreenColor} />
      </View>
    )
  }

  React.useEffect(() => {
    if (state.hasMoreData) {
      if (!loading && fetchMoreData) { loadMoreAnnouncements() }
    } else {
      setFetchMoreData(false);
    }
  }, [loading, fetchMoreData, setFetchMoreData, state.hasMoreData]);

  return (
    <View style={styles.container}>
      <View>
        {
          useMediaQuery(1025, 1300) &&
          <FlatList
            data={announcements}
            numColumns={2}
            onEndReached={() => { setFetchMoreData(true) }}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => <AnnouncementView announcement={item} />}
            ListFooterComponent={() => loaderFooter()} />
        }
        {
          !useMediaQuery(1025, 1300) &&
          <FlatList
            data={announcements}
            numColumns={3}
            onEndReached={() => { setFetchMoreData(true) }}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => <AnnouncementView announcement={item} />}
            ListFooterComponent={() => loaderFooter()} />
        }
      </View>
    </View>
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});