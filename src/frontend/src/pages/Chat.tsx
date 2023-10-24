import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import ConversationsList from "../common/components/ConversationList"; // Corrigi o nome do arquivo
import ChatComponent from "../common/components/ChatComponent";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleConversationSelect = (chatId: string | null) => {
    setSelectedChatId(chatId);
  };

  return (
    <View style={styles.container}>
      <ConversationsList onConversationSelect={handleConversationSelect} />
      <ChatComponent chatId={selectedChatId} currentUser="Você" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});
