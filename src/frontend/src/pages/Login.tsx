import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import ProfileBox from "../common/components/ProfileBox";

export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? 'LANDSCAPE' : 'PORTRAIT');
  const navigation = useNavigation<StackTypes>()

  useEffect(() => {
    const onChange = ({ window: { width, height } }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    Dimensions.addEventListener("change", onChange);
    return () => {
      // Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleLogin = async () => {
    if (email && password) {
      try {
        const isLogged = await auth.login({ email: email, password: password })
        if (isLogged) {
          navigation.navigate("Anúncios", {})
        } else throw new Error("Erro ao logar o usuário");
      } catch (error) {
        console.error(error);
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column-reverse',
      backgroundColor: "#E1DCC5",
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputSection: {
      flexBasis: orientation === 'LANDSCAPE' ? '70%' : '75%',
      padding: 20,
      justifyContent: 'center',
      maxWidth: 500,
    },
    welcomeSection: {
      flexBasis: orientation === 'LANDSCAPE' ? '30%' : '25%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      marginVertical: 20,
      fontSize: 20,
      height: 60,
    },
    welcomeText: {
      fontSize: 24,
      textAlign: 'center',
    }
  });

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        <View style={styles.inputSection}>
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
          />
          <PrimaryButton
            style={styles.input}
            onPress={handleLogin}
            label='Entrar'
          />
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bem-vindo ao Rentabook! Faça seu login</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}