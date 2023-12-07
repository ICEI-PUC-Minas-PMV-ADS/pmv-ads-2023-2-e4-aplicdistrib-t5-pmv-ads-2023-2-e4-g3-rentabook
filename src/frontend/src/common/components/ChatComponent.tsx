import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { getToken } from "../../other/Storage";
import { API } from "@env";

type ChatComponentProps = {
  chatId: string | null;
  currentUser: string;
  onConversationSelect?: (chatId: string | null) => void;
};

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const ChatComponent = ({ chatId, currentUser }: ChatComponentProps) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    let scheduledFetchChatMessages: NodeJS.Timeout | undefined;

    const timedFetchChatMessages = () => {
      scheduledFetchChatMessages = setTimeout(() => {
        if (chatId) {
          fetchChatMessages(chatId);
        }
        timedFetchChatMessages();
      }, 10000);
    };

    if (chatId) {
      fetchChatMessages(chatId);
      timedFetchChatMessages();
    }

    return () => {
      if (scheduledFetchChatMessages) {
        clearTimeout(scheduledFetchChatMessages);
      }
      scheduledFetchChatMessages = undefined;
    };
  }, [chatId]);

  const fetchChatMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const token = await getToken();

      if (!token) {
        console.error("Token de autenticação ausente.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${Platform.OS === "web" ? API : "https://rentabookapi.azurewebsites.net"
        }/chat/${chatId}/recent_messages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data && data.content) {
          const chatMessages: Message[] = data.content.map((item: any) => ({
            id: item.id,
            text: item.message,
            sender: item.sender.id,
            timestamp: item.latestMessageDate,
          }));

          setMessages(chatMessages);

          flatListRef.current?.scrollToEnd({ animated: true });
        }
      } else {
        console.error("Erro ao buscar mensagens recentes");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!chatId) {
      console.error("ID da conversa ausente.");
      return;
    }

    try {
      const token = await getToken();

      if (!token) {
        console.error("Token de autenticação ausente.");
        return;
      }

      const response = await fetch(
        `${Platform.OS === "web" ? API : "https://rentabookapi.azurewebsites.net"
        }/chat/messages/new`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            message,
          }),
        }
      );

      if (response.status === 200) {
        console.log("Mensagem enviada com sucesso.");

        setMessage("");

        fetchChatMessages(chatId);
      } else {
        console.error("Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log("Item Sender:", item.sender);
          console.log("Current User:", currentUser);

          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent:
                  item.sender === currentUser ? "flex-end" : "flex-start",
              }}
            >
              <View
                style={[
                  styles.messageContainer,
                  {
                    alignSelf:
                      item.sender === currentUser ? "flex-end" : "flex-start",
                  },
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          );
        }}
        inverted
        contentContainerStyle={{ paddingBottom: 20, marginTop: 20 }}
        ref={(ref) => (flatListRef.current = ref)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#E1DCC5",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: "#97C7AF",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    backgroundColor: "#97C7AF",
  },
  messageContainer: {
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    maxWidth: "70%",
    backgroundColor: "#F3EDD7",
  },
  messageText: {
    color: "#406C4B",
  },
  sendButton: {
    backgroundColor: "#406C4B",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  sendButtonText: {
    color: "#F3EDD7",
    textAlign: "center",
  },
});

export default ChatComponent;
