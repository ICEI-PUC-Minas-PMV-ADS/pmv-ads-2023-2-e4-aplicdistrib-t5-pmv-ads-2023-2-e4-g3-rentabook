import { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../routes/StackTypes';



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    justifyContent: 'center'
  },
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
        navigation.navigate("Home", {})
      } else throw "Erro ao logar o usuário"
    }

  }
  return (
    <View style={style.container}>
      <TextInput
        value={email}
        placeholder="Digite seu e-mail"
        onChangeText={setEmail}
      />
      <TextInput
        value={password}
        placeholder="Digite sua senha"
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin} title='Entrar' />
    </View>
  );
}