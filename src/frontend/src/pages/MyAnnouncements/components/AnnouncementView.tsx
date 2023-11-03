import { View, Text, StyleSheet } from "react-native";
import { CleanAnnouncementView } from "../../../types/CleanAnnouncementView";
import { WhiteColor } from "../../../common/theme/colors";
import { ImageLink } from "./ImageLink";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes/StackTypes";
import { useMyAnnouncementsContext } from "../contexts";
import CheckedLabel from "../../../common/components/CheckedLabel";
import SecondaryButton from "../../../common/components/SecondaryButton";

/**
 * AnnouncementViewProps
 */

type AnnouncementViewProps = {
  announcement: CleanAnnouncementView
};

/**
 * AnnouncementView
 */

export function AnnouncementView({ announcement }: AnnouncementViewProps) {
  const navigation = useNavigation<StackTypes>();
  const { dispatch } = useMyAnnouncementsContext();

  const formatDate = (date: string | null) => {
    const dateArr = date?.split('-');
    if (dateArr && dateArr.length > 0) {
      return dateArr[0];
    }
    return date ?? "";
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageLink imageLinks={announcement.book.imageLinks} />
      </View>

      <Text style={styles.title}>{announcement.book.title}</Text>
      <Text style={styles.publisher}>Editora: {announcement.book.publisher}</Text>
      <Text style={styles.publisherYear}>Ano de publicação: {formatDate(announcement.book.publishedDate)}</Text>

      <View style={styles.tagsContainer}>
        {announcement.sale && (
          <CheckedLabel label="Disponível para venda" />)}
        {announcement.trade && (
          <CheckedLabel label="Disponível para troca" />)}
        {announcement.rent && (
          <CheckedLabel label="Disponível para aluguel" />)}
      </View>

      <View style={styles.buttonContainer}>
        <SecondaryButton
          label="Editar"
          style={{ width: 100 }}
          fontSize={12}
          onClick={() => {
            dispatch({ type: 'set_has_reseted', payload: false });
            navigation.navigate("Criar Anúncio", { announcementId: announcement.id })
          }} />
      </View>
    </View>
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    width: 310,
    height: 650,
    backgroundColor: WhiteColor,
    marginRight: 40,
    marginBottom: 40,
    padding: 10,
    gap: 10,
  },
  imageContainer: {
    width: 290,
    height: 290,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  publisher: {
    fontSize: 12,
  },
  publisherYear: {
    fontSize: 12,
  },
  tagsContainer: {
    width: '100%',
    height: 100,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});