import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

export default function Signup() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? 'LANDSCAPE' : 'PORTRAIT');
  const navigation = useNavigation<StackTypes>();

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    });
  }, []);

  const styles = StyleSheet.create({
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
        <View style={styles.inputSection}>
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
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Crie uma nova conta</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}