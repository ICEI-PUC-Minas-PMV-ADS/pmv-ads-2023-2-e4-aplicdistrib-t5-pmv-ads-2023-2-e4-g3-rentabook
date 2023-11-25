import * as React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { CleanAnnouncementView } from "../../../types/CleanAnnouncementView";
import { BlackColor, WhiteColor } from "../../../common/theme/colors";
import { ImageLink } from "./ImageLink";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../../routes/StackTypes";
import { useMyAnnouncementsContext } from "../contexts";
import { announcementsService } from "../../../services/announcementsService";
import CheckedLabel from "../../../common/components/CheckedLabel";
import SecondaryButton from "../../../common/components/SecondaryButton";
import Dropdown from "../../../common/components/Dropdown";

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
  const [changeStatus, setChangeStatus] = React.useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = React.useState("");
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

      <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>{announcement.book.title}</Text>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.publisher} ellipsizeMode="tail" numberOfLines={2}>
          Editora: {
            announcement.book.publisher && (
              announcement.book.publisher?.length > 80 ?
                announcement.book.publisher?.substring(0, 80) + "..." :
                announcement.book.publisher
            )
          }
        </Text>
        <Text style={styles.publisherYear} ellipsizeMode="tail" numberOfLines={2}>Ano de publicação: {formatDate(announcement.book.publishedDate)}</Text>
      </View>

      {announcement.isAvailable && (
        <View style={styles.tagsContainer}>
          {announcement.sale && (
            <CheckedLabel label="Disponível para venda" />)}
          {announcement.trade && (
            <CheckedLabel label="Disponível para troca" />)}
          {announcement.rent && (
            <CheckedLabel label="Disponível para aluguel" />)}
        </View>
      )}

      {!announcement.isAvailable && (
        <View style={[styles.tagsContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontWeight: 'bold' }}>{announcement.status ?? ""}</Text>
        </View>
      )}

      {announcement.isAvailable && (
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
      )}

      {!announcement.isAvailable &&
        <View style={styles.buttonContainer}>
          <SecondaryButton
            label="Alterar status"
            style={{ width: 150 }}
            fontSize={12}
            onClick={() => {
              setSelectedStatus("");
              setChangeStatus(true);
            }} />
        </View>
      }

      <Modal visible={changeStatus} transparent>
        <Pressable style={{ flex: 1 }} onPress={() => setChangeStatus(false)}>
          <View style={{ flex: 1, backgroundColor: "#00000075", justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                width: 400,
                backgroundColor: "#E1DCC5",
                borderRadius: 15,
                shadowColor: BlackColor,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 15,
                padding: 20,
              }}>
              <Text>Selecione o status do livro:</Text>

              <View style={{ height: 10 }} />

              <Dropdown
                placeholder="Selecione o status"
                value={selectedStatus}
                onSelect={(item) => setSelectedStatus(item)}
                getValue={(item) => item}
                items={[
                  "Aguardando envio",
                  "Enviado",
                  "Aguadando entrega",
                  "Entregue",
                  "Aguardando retorno",
                  "Devolvido",
                  "Finalizado",
                ]}>
                {(item) => (
                  <View style={{ backgroundColor: WhiteColor, paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text>{item}</Text>
                  </View>
                )}
              </Dropdown>

              <View style={{ height: 10 }} />

              <View style={styles.buttonContainer}>
                <SecondaryButton
                  label="Salvar"
                  style={{ width: 150 }}
                  fontSize={12}
                  onClick={async () => {
                    await announcementsService.updateStatus(announcement.id, selectedStatus);
                    setChangeStatus(false);
                    dispatch({ type: 'initialize' });
                  }} />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 650,
    backgroundColor: WhiteColor,
  },
  imageContainer: {
    width: 320,
    height: 320,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  publisher: {
    height: 45,
    fontSize: 12,
    paddingHorizontal: 20,
    flexWrap: 'wrap'
  },
  publisherYear: {
    height: 15,
    fontSize: 12,
    paddingHorizontal: 20,
    flexWrap: 'wrap'
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