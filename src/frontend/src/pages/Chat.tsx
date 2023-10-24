import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import ConversationsList from "../common/components/ConversationList";
import ChatComponent from "../common/components/ChatComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleConversationSelect = (chatId: string | null) => {
    setSelectedChatId(chatId);
  };

  useEffect(() => {
    // Função assíncrona para buscar o token no AsyncStorage
    async function fetchTokenAndUserData() {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEY);

        if (token) {
          // Realize a solicitação para obter os dados do usuário da API.
          const response = await fetch(
            "https://rentabookapi.azurewebsites.net/user",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // Extraia o nome do usuário dos dados da resposta e defina-o no estado.
            const userName = data.name;
            setCurrentUser(userName);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    }

    fetchTokenAndUserData();
  }, []); // Certifique-se de passar uma matriz vazia como segundo argumento para useEffect para que a solicitação seja feita apenas uma vez.

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        <ConversationsList onConversationSelect={handleConversationSelect} />
        <ChatComponent
          chatId={selectedChatId}
          currentUser={currentUser ?? ""}
        />
      </View>
    </ResponsiveNavbar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

const STORAGE_KEY = "authToken";
