import { useState } from 'react'
import { View, StyleSheet, Text } from "react-native";
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParamsList } from '../routes/AppParamsList';



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
});



export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AppParamsList>>()


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
      <input
        type="text"
        value={email}
        placeholder="Digite seu e-mail"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Digite sua senha"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Logar</button>
    </View>
  );
}