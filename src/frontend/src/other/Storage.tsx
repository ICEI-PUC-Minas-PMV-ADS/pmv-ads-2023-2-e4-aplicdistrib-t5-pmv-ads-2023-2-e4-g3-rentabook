import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "authToken";

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, token);
  } catch (error) {
    console.error("Erro ao armazenar o token:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEY);
    return token;
  } catch (error) {
    console.error("Erro ao obter o token:", error);
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar o token:", error);
  }
};
