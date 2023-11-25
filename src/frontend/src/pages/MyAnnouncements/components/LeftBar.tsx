import { View, Text, StyleSheet } from "react-native";
import ComposedButton from "../../../common/components/ComposedButton";
import { MyAnnouncementsComsumer, useMyAnnouncementsContext } from "../contexts";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes/StackTypes";
import { useMediaQuery } from './../../../hooks/useResposive';
import Dropdown from "../../../common/components/Dropdown";
import { WhiteColor } from "../../../common/theme/colors";

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

            <Dropdown
              value={'Todos'}
              onSelect={(item) => dispatch({ type: 'set_general_filter', payload: item.toLowerCase() })}
              getValue={(item) => item}
              items={['Todos', 'Disponiveis', 'Negociados']}
            >
              {(item) => (
                <View style={{
                  backgroundColor: WhiteColor,
                  paddingHorizontal: 5,
                  paddingVertical: 8,
                }}>
                  <Text>{item}</Text>
                </View>
              )}
            </Dropdown>

            <View style={{ height: 20 }} />

            <MyAnnouncementsComsumer>
              {({ state: { generalFilter, filter } }) => {
                return (
                  ((generalFilter === 'todos' || generalFilter === 'disponiveis') &&
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
                  )
                );
              }}
            </MyAnnouncementsComsumer>

            <MyAnnouncementsComsumer>
              {
                ({ state: { generalFilter } }) => {
                  return (
                    <>
                      {generalFilter === 'todos' && <View style={{ height: 20 }} />}
                    </>
                  );
                }}
            </MyAnnouncementsComsumer>

            <MyAnnouncementsComsumer>
              {({ state: { generalFilter, filter } }) => {
                return (
                  ((generalFilter === 'todos' || generalFilter === 'negociados') &&
                    <>
                      <PrimaryButton
                        label="Aguardando de envio"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.waitingSend}
                        onPress={() => { dispatch({ type: 'toggle_filter_waiting_send' }) }} />

                      <View style={{ height: 20 }} />

                      <PrimaryButton
                        label="Aguardando entrega"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.waitingDelivery}
                        onPress={() => { dispatch({ type: 'toggle_filter_waiting_delivery' }) }} />

                      <View style={{ height: 20 }} />

                      <PrimaryButton
                        label="Aguardando devolução"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.waitingReturn}
                        onPress={() => { dispatch({ type: 'toggle_filter_waiting_return' }) }} />

                      <View style={{ height: 20 }} />

                      <PrimaryButton
                        label="Finalizados"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.complete}
                        onPress={() => { dispatch({ type: 'toggle_filter_complete' }) }} />
                    </>
                  )
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

            <Dropdown
              value={'Todos'}
              onSelect={(item) => dispatch({ type: 'set_general_filter', payload: item.toLowerCase() })}
              getValue={(item) => item}
              items={['Todos', 'Disponiveis', 'Negociados']}
            >
              {(item) => (
                <View style={{
                  backgroundColor: WhiteColor,
                  paddingHorizontal: 5,
                  paddingVertical: 8,
                }}>
                  <Text>{item}</Text>
                </View>
              )}
            </Dropdown>

            <View style={{ height: 20 }} />

            <MyAnnouncementsComsumer>
              {({ state: { generalFilter, filter } }) => {
                return (
                  ((generalFilter === 'todos' || generalFilter === 'disponiveis') &&
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
                  )
                );
              }}
            </MyAnnouncementsComsumer>

            <MyAnnouncementsComsumer>
              {
                ({ state: { generalFilter } }) => {
                  return (
                    <>
                      {generalFilter === 'todos' && <View style={{ height: 20 }} />}
                    </>
                  );
                }}
            </MyAnnouncementsComsumer>

            <MyAnnouncementsComsumer>
              {({ state: { generalFilter, filter } }) => {
                return (
                  ((generalFilter === 'todos' || generalFilter === 'negociados') &&
                    <>
                      <PrimaryButton
                        label="Aguardando de envio"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.waitingSend}
                        onPress={() => { dispatch({ type: 'toggle_filter_waiting_send' }) }} />

                      <View style={{ height: 20 }} />

                      <PrimaryButton
                        label="Aguardando entrega"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.waitingDelivery}
                        onPress={() => { dispatch({ type: 'toggle_filter_waiting_delivery' }) }} />

                      <View style={{ height: 20 }} />

                      <PrimaryButton
                        label="Aguardando devolução"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.waitingReturn}
                        onPress={() => { dispatch({ type: 'toggle_filter_waiting_return' }) }} />

                      <View style={{ height: 20 }} />

                      <PrimaryButton
                        label="Finalizados"
                        style={{ paddingVertical: 15 }}
                        activeStyle={filter.complete}
                        onPress={() => { dispatch({ type: 'toggle_filter_complete' }) }} />
                    </>
                  )
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