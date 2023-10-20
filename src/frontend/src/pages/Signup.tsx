import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

const styles = StyleSheet.create({
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

export default function Signup() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackTypes>();

  const handleSignup = async () => {
    if (name && email && password) {
      const isRegistered = await auth.signup({ name, email, password });
      if (isRegistered) {
        navigation.navigate("Anúncios", {});
      } else {
        throw "Erro ao cadastrar o usuário";
      }
    }
  }

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Input
            style={styles.input}
            value={name}
            placeholder="Digite seu nome"
            label="Nome"
            onChangeText={setName}
          />
          <Input
            style={styles.input}
            value={email}
            placeholder="Digite seu e-mail"
            label="Email"
            onChangeText={setEmail}
          />
          <Input
            style={styles.input}
            value={password}
            placeholder="Digite sua senha"
            label="Senha"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <PrimaryButton
            style={styles.input}
            onPress={handleSignup}
            label='Continuar'
          />
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.welcomeText}>Crie uma nova conta</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}