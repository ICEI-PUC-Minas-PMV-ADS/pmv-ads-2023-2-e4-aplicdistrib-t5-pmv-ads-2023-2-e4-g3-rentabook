import { useState } from 'react'
import { View, StyleSheet, Button } from "react-native";
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
    justifyContent: 'center'
  },
  input: {
    marginTop: 20,
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
        navigation.navigate("Home", {})
      } else throw "Erro ao logar o usuário"
    }

  }
  return (
    <View style={style.container}>
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
  );
}