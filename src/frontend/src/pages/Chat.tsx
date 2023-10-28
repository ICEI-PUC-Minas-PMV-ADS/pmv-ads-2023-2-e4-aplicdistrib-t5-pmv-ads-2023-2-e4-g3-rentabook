import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import ConversationsList from "../common/components/ConversationList";
import ChatComponent from "../common/components/ChatComponent";
import Banner from "../common/components/Banner";
import { getToken } from "../other/Storage";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleConversationSelect = (chatId: string | null) => {
    setSelectedChatId(chatId);
  };

  useEffect(() => {
    async function fetchTokenAndUserData() {
      try {
        const token = await getToken();

        if (token) {
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
            const userName = data.name;
            setCurrentUser(userName);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    }
    fetchTokenAndUserData();
  }, []);

  const handleAccept = () => {
    // Lógica de aceitação do anúncio
    console.log("Anúncio aceito com sucesso.");
    // Aqui você pode atualizar o estado ou fazer qualquer ação necessária após a aceitação
  };

  const handleCancel = () => {
    // Lógica de cancelamento do anúncio
    console.log("Anúncio cancelado com sucesso.");
    // Aqui você pode atualizar o estado ou fazer qualquer ação necessária após o cancelamento
  };

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveNavbar>
        <View style={styles.contentContainer}>
          <View style={styles.conversationsListContainer}>
            <ConversationsList
              onConversationSelect={handleConversationSelect}
            />
          </View>
          <View style={styles.chatContainer}>
            {selectedChatId && (
              <>
                <Banner
                  actionType="complete"
                  onAccept={handleAccept}
                  onCancel={handleCancel}
                />
                <ChatComponent
                  chatId={selectedChatId}
                  currentUser={currentUser ?? ""}
                />
              </>
            )}
          </View>
        </View>
      </ResponsiveNavbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  conversationsListContainer: {
    width: "30%", // Definindo a largura para 80% da tela
  },
  chatContainer: {
    flex: 1,
  },
});
