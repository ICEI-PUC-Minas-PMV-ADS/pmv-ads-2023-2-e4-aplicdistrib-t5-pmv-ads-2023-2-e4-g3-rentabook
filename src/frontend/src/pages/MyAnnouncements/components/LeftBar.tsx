import { View, Text, StyleSheet } from "react-native";
import ComposedButton from "../../../common/components/ComposedButton";
import { MyAnnouncementsComsumer, useMyAnnouncementsContext } from "../contexts";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes/StackTypes";

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
  );
};

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 40,
    width: 300,
  },
  filterTitle: {
    fontSize: 18,
    marginVertical: 20,
  },
});