import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { WhiteColor } from '../../../common/theme/colors';
import { useMyAnnouncementsContext } from "../contexts";
import { AnnouncementList } from "./AnnouncementList";
import { announcementsService } from "../../../services/announcementsService";
import SearchInput from "../../../common/components/SearchInput";
import Dropdown from "../../../common/components/Dropdown";

/**
 * RightContentProps
 */

type RightContentProps = {};

/**
 * Filter options
 */

const FilterOptions = [
  { id: 1, label: 'Mais recente' },
  { id: 2, label: 'Mais antigo' },
  { id: 3, label: 'Menor preço para aluguel' },
  { id: 4, label: 'Maior preço para aluguel' },
  { id: 5, label: 'Menor preço para compra' },
  { id: 6, label: 'Maior preço para compra' },
];

/**
 * LeftBar
 */

export const RightContent = (props: RightContentProps) => {
  const [page, setPage] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const { state, dispatch } = useMyAnnouncementsContext();

  React.useEffect(() => {
    if (state.hasMoreData && !loading) {
      setLoading(true);
      announcementsService.getMyOwnAnnouncements(page)
        .then((data) => {
          dispatch({ type: 'load_announcements', payload: data.content });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [page]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/**
          * Search bar
          */}

        <SearchInput
          style={{ width: 400 }}
          placeholder="Pesquisar por livro"
          onChange={(value) => dispatch({ type: 'set_search_term', payload: value })} />

        <Dropdown
          items={FilterOptions}
          style={{ width: 250 }}
          placeholder="Ordenar por"
          getValue={(item) => item.label}
          onSelect={(item) => dispatch({ type: 'set_sort_filter', payload: item.id })}>
          {(item) => (
            <View style={{ backgroundColor: WhiteColor, paddingHorizontal: 20, paddingVertical: 10 }}>
              <Text>{item.label}</Text>
            </View>
          )}
        </Dropdown>
      </View>

      {/**
        * Content
        */}

      <View style={styles.container}>
        <AnnouncementList
          loading={loading}
          loadMoreAnnouncements={() => { setPage((page) => page + 1); }}
          announcements={state.announcements} />
      </View>
    </View>
  );
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 40,
  },
  searchBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  }
});