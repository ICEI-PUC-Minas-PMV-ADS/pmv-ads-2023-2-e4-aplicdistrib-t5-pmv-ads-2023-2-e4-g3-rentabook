import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import ConversationsList from "../common/components/ConversationList";
import ChatComponent from "../common/components/ChatComponent";
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
