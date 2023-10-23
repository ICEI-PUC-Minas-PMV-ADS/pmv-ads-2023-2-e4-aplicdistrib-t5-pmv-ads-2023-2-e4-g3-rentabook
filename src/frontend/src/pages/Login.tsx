import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? 'LANDSCAPE' : 'PORTRAIT');
  const navigation = useNavigation<StackTypes>()

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    });
  }, []);

  const style = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column-reverse',
      backgroundColor: "#E1DCC5",
    },
    input: {
      margin: 10,
    },
    inputSection: {
      flex: orientation === 'LANDSCAPE' ? 1 : 0.7,
      padding: 20,
      justifyContent: 'center',
    },
    welcomeSection: {
      flex: orientation === 'LANDSCAPE' ? 1 : 0.3,
      justifyContent: 'center',
    },
    welcomeText: {
      fontSize: 24,
      textAlign: 'center',
    }
  });

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.login({ email: email, password: password })
      if (isLogged) {
        navigation.navigate("Anúncios", {})
      } else throw "Erro ao logar o usuário"
    }

  }

  return (
    <ResponsiveNavbar>
      <View style={style.container}>
        <View style={style.inputSection}>
          <Input
            style={style.input}
            value={email}
            placeholder="Digite seu e-mail"
            label="Email"
            onChangeText={setEmail}
          />
          <Input
            style={style.input}
            value={password}
            placeholder="Digite sua senha"
            label="Senha"
            onChangeText={setPassword}
          />
          <PrimaryButton
            style={style.input}
            onPress={handleLogin}
            label='Entrar'
          />
        </View>
        <View style={style.welcomeSection}>
          <Text style={style.welcomeText}>Bem-vindo ao Rentabook!</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}