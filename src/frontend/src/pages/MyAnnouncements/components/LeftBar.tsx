import { View, Text, StyleSheet } from "react-native";
import ComposedButton from "../../../common/components/ComposedButton";
import { MyAnnouncementsComsumer, useMyAnnouncementsContext } from "../contexts";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes/StackTypes";
import { useMediaQuery } from './../../../hooks/useResposive';

/**
 * LeftBarProps
 */

type LeftBarProps = {};

/**
 * LeftBar
 */

export const LeftBar = (props: LeftBarProps) => {
  const navigation = useNavigation<StackTypes>();
  const { dispatch } = useMyAnnouncementsContext();

  return (
    <>
      {
        useMediaQuery(0, 601) && (
          <View style={styles.containerXs}>
            <ComposedButton
              title="Cadastrar livro"
              onClick={() => {
                dispatch({ type: 'set_has_reseted', payload: false });
                navigation.navigate('Criar Anúncio', {})
              }} />

            <Text style={styles.filterTitle}>Filtrar por:</Text>

            <MyAnnouncementsComsumer>
              {({ state: { filter } }) => {
                return (
                  <>
                    <PrimaryButton
                      label="Disponível para venda"
                      style={{ paddingVertical: 15 }}
                      activeStyle={filter.sale}
                      onPress={() => { dispatch({ type: 'toggle_filter_sale' }) }} />

                    <View style={{ height: 20 }} />

                    <PrimaryButton
                      label="Disponível para aluguel"
                      style={{ paddingVertical: 15 }}
                      activeStyle={filter.rent}
                      onPress={() => { dispatch({ type: 'toggle_filter_rent' }) }} />

                    <View style={{ height: 20 }} />

                    <PrimaryButton
                      label="Disponível para troca"
                      style={{ paddingVertical: 15 }}
                      activeStyle={filter.trade}
                      onPress={() => { dispatch({ type: 'toggle_filter_trade' }) }} />
                  </>
                );
              }}
            </MyAnnouncementsComsumer>
          </View>
        )
      }
      {
        useMediaQuery(600, 10000) && (
          <View style={styles.container}>
            <ComposedButton
              title="Cadastrar livro"
              onClick={() => {
                dispatch({ type: 'set_has_reseted', payload: false });
                navigation.navigate('Criar Anúncio', {})
              }} />

            <Text style={styles.filterTitle}>Filtrar por:</Text>

            <MyAnnouncementsComsumer>
              {({ state: { filter } }) => {
                return (
                  <>
                    <PrimaryButton
                      label="Disponível para venda"
                      style={{ paddingVertical: 15 }}
                      activeStyle={filter.sale}
                      onPress={() => { dispatch({ type: 'toggle_filter_sale' }) }} />

                    <View style={{ height: 20 }} />

                    <PrimaryButton
                      label="Disponível para aluguel"
                      style={{ paddingVertical: 15 }}
                      activeStyle={filter.rent}
                      onPress={() => { dispatch({ type: 'toggle_filter_rent' }) }} />

                    <View style={{ height: 20 }} />

                    <PrimaryButton
                      label="Disponível para troca"
                      style={{ paddingVertical: 15 }}
                      activeStyle={filter.trade}
                      onPress={() => { dispatch({ type: 'toggle_filter_trade' }) }} />
                  </>
                );
              }}
            </MyAnnouncementsComsumer>
          </View>
        )
      }
    </>
  );
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  containerXs: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    paddingTop: 20,
    width: 260,
    paddingEnd: 20,
  },
  filterTitle: {
    fontSize: 18,
    marginVertical: 20,
  },
});