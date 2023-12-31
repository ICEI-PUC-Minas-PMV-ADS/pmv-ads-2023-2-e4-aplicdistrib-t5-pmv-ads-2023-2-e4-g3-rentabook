import { ImagePickerAsset } from "expo-image-picker";
import { useApi } from "../hooks/useApi";
import { LoginForm } from "../types/LoginForm";
import { RegisterForm } from "../types/RegisterForm";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Platform } from "react-native";
import { API } from "@env";


export const userService = {
  login: async (form: LoginForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/login", json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  signup: async (form: RegisterForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/register", json, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  },// NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  getPrivateUser: async () => {
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.get("/user", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  },

  getPrivateUserImage: async (id: string) => {
    const response = await useApi.get(`/public/image/${id}`)
    return response.data;
  },

  updatePrivateUser: async (nome: string) => {
    const token = await AsyncStorage.getItem('authToken')
    const json = JSON.stringify({ 'name': nome })
    const response = await useApi.post("/user/updateProfile", json, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  },

  updatePrivateUserImage: async (image: FormData) => {
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.post("/user/image", image, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  deletePrivateUserImage: async () => {
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.delete("/user/image", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  },

  uploadImageMobile: async (file: ImagePickerAsset) => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await FileSystem.uploadAsync((Platform.OS === 'web' ? API : "https://rentabookapi.azurewebsites.net") + "/user/image", file.uri, {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      httpMethod: 'POST',
      fieldName: 'image',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return JSON.parse(response.body);
  },



  logout: async () => {
    const body = JSON.stringify({})
    const token = await AsyncStorage.getItem('authToken')
    const response = await useApi.post("/leave", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT
}