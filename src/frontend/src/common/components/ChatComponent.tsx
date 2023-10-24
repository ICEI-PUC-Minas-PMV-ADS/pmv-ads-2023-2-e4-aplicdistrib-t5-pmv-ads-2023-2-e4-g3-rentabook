import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getToken } from "../../other/Storage";

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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    }
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
        `https://rentabookapi.azurewebsites.net/chat/${chatId}/recent_messages`,
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
          const chatMessages = data.content.map((item: any) => ({
            id: item.id,
            text: item.message,
            sender: item.sender.name,
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
        `https://rentabookapi.azurewebsites.net/chat/messages/new`,
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
        // Limpar o campo de mensagem após o envio
        setMessage("");
        // Recarregar as mensagens após o envio
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
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent:
                item.sender === "currentUser" ? "flex-start" : "flex-end",
            }}
          >
            <View
              style={
                item.sender === "currentUser"
                  ? styles.messageReceived
                  : styles.messageSent
              }
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        inverted
        ref={(ref) => (flatListRef.current = ref)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused ? styles.inputFocused : null]}
          placeholder="Digite sua mensagem"
          value={message}
          onChangeText={setMessage}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      {loading && <Text>Carregando...</Text>}
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
  inputFocused: {
    borderColor: "#406C4B",
    borderWidth: 2,
    outline: "none",
  },
  messageSent: {
    backgroundColor: "#F3EDD7",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 50,
    padding: 10,
    maxWidth: "70%",
  },
  messageReceived: {
    backgroundColor: "#F3EDD7",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 50,
    marginLeft: 10,
    padding: 10,
    maxWidth: "70%",
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
