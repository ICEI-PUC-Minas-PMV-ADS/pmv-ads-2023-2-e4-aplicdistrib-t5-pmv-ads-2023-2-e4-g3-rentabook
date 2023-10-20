import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";



const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1DCC5",
  },
  input: {
    marginTop: 20,
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
        navigation.navigate("Anúncios", {})
      } else throw "Erro ao logar o usuário"
    }

  }
  return (
    <ResponsiveNavbar>
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
    </ResponsiveNavbar>
  );
}