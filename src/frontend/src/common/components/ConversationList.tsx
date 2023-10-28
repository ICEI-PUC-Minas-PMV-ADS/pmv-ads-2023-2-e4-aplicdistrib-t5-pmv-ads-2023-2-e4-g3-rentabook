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
import { format, parseISO } from "date-fns";

export let typeId: string | null = null; // Exportando a variável typeId
export let selectedItemContent: string | null = null; // Exportando a variável selectedItemContent
export let selectedItemContentType: "rent" | "sale" | "trade" | null = null; // Exportando o tipo da selectedItemContent

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
  latestMessageDate: string;
  sale: string | null;
  trade: string | null;
  rent: string | null;
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
        const updatedConversations = data.content.map((conversation: any) => ({
          id: conversation.id,
          owner: conversation.owner,
          lead: conversation.lead,
          latestMessageDate: conversation.latestMessageDate,
          sale: conversation.sale,
          trade: conversation.trade,
          rent: conversation.rent,
        }));
        setConversations(updatedConversations);

        if (updatedConversations.length > 0) {
          setSelectedItem(updatedConversations[0].id);
          onConversationSelect(updatedConversations[0].id);
          if (updatedConversations[0].sale !== null) {
            selectedItemContent = updatedConversations[0].sale;
            typeId = updatedConversations[0].sale;
            selectedItemContentType = "sale"; // Definindo tipo aqui
          } else if (updatedConversations[0].trade !== null) {
            selectedItemContent = updatedConversations[0].trade;
            typeId = updatedConversations[0].trade;
            selectedItemContentType = "trade"; // Definindo tipo aqui
          } else if (updatedConversations[0].rent !== null) {
            selectedItemContent = updatedConversations[0].rent;
            typeId = updatedConversations[0].rent;
            selectedItemContentType = "rent"; // Definindo tipo aqui
          }
        }
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
    if (conversation.sale !== null) {
      selectedItemContent = conversation.sale;
      typeId = conversation.sale;
      selectedItemContentType = "sale"; // Definindo tipo aqui
    } else if (conversation.trade !== null) {
      selectedItemContent = conversation.trade;
      typeId = conversation.trade;
      selectedItemContentType = "trade"; // Definindo tipo aqui
    } else if (conversation.rent !== null) {
      selectedItemContent = conversation.rent;
      typeId = conversation.rent;
      selectedItemContentType = "rent"; // Definindo tipo aqui
    }
  };

  const formatMessageDate = (date: string) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "dd/MM/yyyy HH:mm");
  };

  return (
    <View style={styles.container}>
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
              <Text
                style={[
                  styles.transactionType,
                  selectedItem === item.id && { color: "#F3EDD7" },
                ]}
              >
                Tipo de Transação: {selectedItemContent}
              </Text>
              <Text
                style={[
                  styles.latestMessageDate,
                  selectedItem === item.id && { color: "#F3EDD7" },
                ]}
              >
                Última mensagem em: {formatMessageDate(item.latestMessageDate)}
              </Text>
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
    width: "100%", // Adjust the width here to your desired percentage or value
  },
  conversationItem: {
    marginBottom: 10,
    padding: 30,
    flex: 1,
    backgroundColor: "#F3EDD7",
  },
  conversationText: {
    color: "black",
  },
  transactionType: {
    fontSize: 14,
  },
  latestMessageDate: {
    color: "gray",
    fontSize: 12,
  },
});
