import * as React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { CleanAnnouncementView } from "../../../types/CleanAnnouncementView";
import { AnnouncementView } from "./AnnouncementView";
import { Desktop, MobileAndTablet, useMediaQuery } from "../../../hooks/useResposive";
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

  const loaderFooter = (color?: string) => {
    if (state.hasMoreData == false) return <View style={{ height: 20 }} />
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

  const renderItem = (item: CleanAnnouncementView, index: number, columnCount: number) => {
    if (index % columnCount === 0) {
      return (
        <View style={{ marginEnd: 10 }}>
          <AnnouncementView announcement={item} />
        </View>
      );
    }
    if (index % columnCount === columnCount - 1) {
      return (
        <View style={{ marginStart: 10 }}>
          <AnnouncementView announcement={item} />
        </View>
      );
    }
    return (
      <View style={{ marginHorizontal: 10 }}>
        <AnnouncementView announcement={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {
          useMediaQuery(0, 601) && (
            <FlatList
              data={announcements}
              numColumns={1}
              nestedScrollEnabled
              scrollEnabled={false}
              contentContainerStyle={{ justifyContent: 'center' }}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              onEndReached={() => { setFetchMoreData(true) }}
              onEndReachedThreshold={0.1}
              renderItem={({ item }) => <View style={{ width: '100%', alignItems: 'center' }}><AnnouncementView announcement={item} /></View>}
              ListFooterComponent={() => loaderFooter()} />
          )
        }
        {
          useMediaQuery(600, 1025) && (
            <FlatList
              data={announcements}
              numColumns={1}
              contentContainerStyle={{ justifyContent: 'center' }}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              onEndReached={() => { setFetchMoreData(true) }}
              onEndReachedThreshold={0.1}
              renderItem={({ item }) => <View style={{ width: '100%', alignItems: 'center' }}><AnnouncementView announcement={item} /></View>}
              ListFooterComponent={() => loaderFooter()} />
          )
        }
        {
          useMediaQuery(1024, 1301) && (
            <FlatList
              data={announcements}
              numColumns={2}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              onEndReached={() => { setFetchMoreData(true) }}
              onEndReachedThreshold={0.1}
              renderItem={({ item, index }) => renderItem(item, index, 2)}
              ListFooterComponent={() => loaderFooter()} />
          )
        }
        {
          useMediaQuery(1300, 10000) && (
            <FlatList
              data={announcements}
              numColumns={3}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              onEndReached={() => { setFetchMoreData(true) }}
              onEndReachedThreshold={0.1}
              renderItem={({ item, index }) => renderItem(item, index, 3)}
              ListFooterComponent={() => loaderFooter()} />
          )
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
  }
});