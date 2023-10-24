import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../other/Storage";

type Conversation = {
  id: string;
  owner: {
    id: string;
    name: string;
  };
  lead: {
    id: string;
    name: string;
  };
};

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
};

type ConversationsListProps = {
  onConversationSelect: (chatId: string | null) => void;
};

export default function ConversationsList({
  onConversationSelect,
}: ConversationsListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.error("Token de autenticação ausente.");
        return;
      }

      const response = await fetch(
        "https://rentabookapi.azurewebsites.net/chat",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setConversations(data.content);
      } else {
        console.error("Erro ao buscar conversas");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  const handleConversationPress = (conversation: Conversation) => {
    onConversationSelect(conversation.id);
    navigation.navigate("Chat", { chatId: conversation.id });
    setSelectedItem(conversation.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Conversas</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleConversationPress(item)}
            style={[
              styles.conversationItem,
              selectedItem === item.id && {
                backgroundColor: "#406C4B",
              },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.conversationText,
                  selectedItem === item.id && { color: "#F3EDD7" },
                ]}
              >
                {item.owner.name} para {item.lead.name}
              </Text>
              <Text>ID da Conversa: {item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EDD7",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  conversationItem: {
    marginBottom: 10,
    padding: 20,
    width: "100%",
    flex: 1,
    backgroundColor: "#F3EDD7",
  },
  conversationText: {
    color: "black",
  },
});
