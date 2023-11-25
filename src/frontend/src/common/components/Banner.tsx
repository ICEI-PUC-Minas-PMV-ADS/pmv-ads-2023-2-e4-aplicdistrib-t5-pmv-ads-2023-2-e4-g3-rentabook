import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getToken } from "../../other/Storage";
import {
  selectedItemContent,
  selectedItemContentType,
} from "../components/ConversationList";
import { API } from "@env";

type BannerProps = {
  actionType: "complete" | "cancel";
  onAccept: () => void;
  onCancel: () => void;
};

const Banner: React.FC<BannerProps> = ({ actionType, onAccept, onCancel }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [operationStatus, setOperationStatus] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      const token = await getToken();
      setIsAuthenticated(!!token);
    }

    checkAuthentication();
  }, []);

  let announcementType: string;
  if (selectedItemContentType === "rent") {
    announcementType = "rent";
  } else if (selectedItemContentType === "sale") {
    announcementType = "sale";
  } else if (selectedItemContentType === "trade") {
    announcementType = "trade";
  } else {
    announcementType = "Tipo não especificado";
  }

  const announcementId = selectedItemContent;

  const handleAccept = async () => {
    if (!isAuthenticated) {
      setOperationStatus("Usuário não autenticado.");
      console.error("Usuário não autenticado.");
      return;
    }

    if (announcementType === "Tipo não especificado") {
      setOperationStatus("Tipo de anúncio ausente.");
      console.error("Tipo de anúncio ausente.");
      return;
    }

    if (announcementId === null) {
      setOperationStatus("ID de anúncio ausente.");
      console.error("ID de anúncio ausente.");
      return;
    }

    const token = await getToken();
    console.log("Token de autenticação:", token);

    const apiUrl = `${API}/${announcementType}s/${announcementId}/complete`;
    console.log("URL da API:", apiUrl);

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setOperationStatus(
            `Anúncio de ${announcementType} aceito com sucesso.`
          );
          console.log(`Anúncio de ${announcementType} aceito com sucesso.`);
          onAccept();
        } else {
          setOperationStatus(
            `Falha ao aceitar o anúncio de ${announcementType}.`
          );
          console.error(`Falha ao aceitar o anúncio de ${announcementType}.`);
          onCancel();
        }
      })
      .catch((error) => {
        setOperationStatus("Erro na requisição.");
        console.error("Erro na requisição:", error);
      });
  };

  const handleCancel = async () => {
    if (!isAuthenticated) {
      setOperationStatus("Usuário não autenticado.");
      console.error("Usuário não autenticado.");
      return;
    }

    if (announcementType === "Tipo não especificado") {
      setOperationStatus("Tipo de anúncio ausente.");
      console.error("Tipo de anúncio ausente.");
      return;
    }

    if (announcementId === null) {
      setOperationStatus("ID de anúncio ausente.");
      console.error("ID de anúncio ausente.");
      return;
    }

    const token = await getToken();
    console.log("Token de autenticação:", token);

    const apiUrl = `${API}/${announcementType}s/${announcementId}/cancel`;
    console.log("URL da API:", apiUrl);

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setOperationStatus(
            `Anúncio de ${announcementType} cancelado com sucesso.`
          );
          console.log(`Anúncio de ${announcementType} cancelado com sucesso.`);
          onCancel();
        } else {
          setOperationStatus(
            `Falha ao cancelar o anúncio de ${announcementType}.`
          );
          console.error(`Falha ao cancelar o anúncio de ${announcementType}.`);
          onAccept();
        }
      })
      .catch((error) => {
        setOperationStatus("Erro na requisição.");
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <View style={styles.banner}>
      {operationStatus && (
        <Text style={styles.operationStatusText}>{operationStatus}</Text>
      )}
      <Text style={styles.bannerText}>
        Deseja {actionType === "complete" ? "aceitar" : "cancelar"} este anúncio
        de {announcementType}?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={handleAccept}
        >
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#F3EDD7",
    padding: 10,
    borderRadius: 8,
    height: "20%",
    width: "100%",
  },
  bannerText: {
    fontSize: 12,
    marginBottom: 10,
  },
  operationStatusText: {
    color: "green",
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
    width: "55%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "green",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Banner;
