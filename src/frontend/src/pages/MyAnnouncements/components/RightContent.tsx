import * as React from 'react';

import { StyleSheet, View, Text } from "react-native";
import { WhiteColor } from '../../../common/theme/colors';
import { MyAnnouncementsComsumer, useMyAnnouncementsContext } from "../contexts";
import { AnnouncementList } from "./AnnouncementList";
import { announcementsService } from "../../../services/announcementsService";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppParamsList } from '../../../routes/AppParamsList';
import { useMediaQuery } from './../../../hooks/useResposive';
import { StackTypes } from '../../../routes/StackTypes';
import SearchInput from "../../../common/components/SearchInput";
import Dropdown from "../../../common/components/Dropdown";

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

export const RightContent = () => {
  const navigation = useNavigation<StackTypes>();
  const route = useRoute<RouteProp<AppParamsList, 'Meus Anúncios'>>();
  const [loading, setLoading] = React.useState(false);
  const { state, dispatch } = useMyAnnouncementsContext();

  const fetchOwnBookData = (page: number) => {
    setLoading(true);
    announcementsService.getMyOwnAnnouncements(page)
      .then((data) => {
        dispatch({ type: 'load_announcements', payload: data.content });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    dispatch({ type: 'initialize' });
  }, []);

  React.useEffect(() => {
    if (route.params.reset && !state.hasReseted) {
      dispatch({ type: 'reset' });
      navigation.setParams({ reset: false });
    }
  }, [route.params.reset, state.hasReseted]);

  React.useEffect(() => {
    if (state.hasMoreData && !loading) {
      fetchOwnBookData(state.page);
    }
  }, [state.page, state.hasMoreData, loading]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {
          useMediaQuery(0, 1025) && (
            <View style={{ width: '100%' }}>
              <SearchInput
                placeholder="Pesquisar por livro"
                onChange={(value) => dispatch({ type: 'set_search_term', payload: value })} />

              <View style={{ height: 20 }} />

              <Dropdown
                items={FilterOptions}
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
          )
        }
        {
          useMediaQuery(1024, 10000) && (
            <>
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
            </>
          )
        }
      </View>

      {/**
        * Content
        */}

      <View style={styles.container}>
        <MyAnnouncementsComsumer>
          {({ state }) => <AnnouncementList
            loading={loading}
            loadMoreAnnouncements={() => { dispatch({ type: 'set_page', payload: state.page + 1 }) }}
            announcements={state.announcements} />}
        </MyAnnouncementsComsumer>
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