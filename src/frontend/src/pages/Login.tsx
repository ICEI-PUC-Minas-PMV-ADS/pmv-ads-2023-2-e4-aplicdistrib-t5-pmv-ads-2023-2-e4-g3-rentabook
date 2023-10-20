import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import NavBar from "../common/components/NavBar";

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#E1DCC5",
  },
  leftSection: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
  }
});

export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackTypes>()

    const handleLogin = async () => {
      if (email && password) {
        const isLogged = await auth.login({ email: email, password: password })
        if (isLogged) {
          navigation.navigate("Anúncios", {})
        } else throw "Erro ao logar o usuário"
      }

    }

  return (
    <NavBar>
      <View style={style.container}>
        <View style={style.leftSection}>
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
        <View style={style.rightSection}>
          <Text style={style.welcomeText}>Bem-vindo ao Rentabook!</Text>
        </View>
      </View>
    </NavBar>
  );
}