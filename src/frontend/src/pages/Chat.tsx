import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import ConversationsList from "../common/components/ConversationList";
import ChatComponent from "../common/components/ChatComponent";
import Banner from "../common/components/Banner";
import { getToken } from "../other/Storage";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [conversationsListHidden, setConversationsListHidden] = useState(false);

  const handleConversationSelect = (chatId: string | null) => {
    setSelectedChatId(chatId);
    setConversationsListHidden(true); // Automatically hide the ConversationsList
  };

  const toggleConversationsList = () => {
    setConversationsListHidden(!conversationsListHidden);
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
        <React.Fragment>
          <View style={styles.contentContainer}>
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
            <View
              style={[
                styles.conversationsListContainer,
                conversationsListHidden && styles.hiddenConversationsList,
              ]}
            >
              <ConversationsList
                onConversationSelect={handleConversationSelect}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleConversationsList}
          >
            <Text style={styles.toggleButtonText}>
              {conversationsListHidden
                ? "Show Conversations"
                : "Hide Conversations"}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      </ResponsiveNavbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EDD7",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  chatContainer: {
    flex: 1,
    position: "relative",
  },
  chatContainerFull: {
    flex: 1,
    width: "100%",
  },
  conversationsListContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
  },
  hiddenConversationsList: {
    display: "none",
  },
  toggleButton: {
    backgroundColor: "#406C4B",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#F3EDD7",
  },
});
