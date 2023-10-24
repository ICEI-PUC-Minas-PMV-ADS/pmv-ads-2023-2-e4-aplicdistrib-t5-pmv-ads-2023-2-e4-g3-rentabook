import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

import ConversationsList from "../common/components/ConversationList";
import ChatComponent from "../common/components/ChatComponent";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleConversationSelect = (chatId: string | null) => {
    setSelectedChatId(chatId);
  };

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        <ConversationsList onConversationSelect={handleConversationSelect} />
        <ChatComponent chatId={selectedChatId} currentUser="Você" />
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
