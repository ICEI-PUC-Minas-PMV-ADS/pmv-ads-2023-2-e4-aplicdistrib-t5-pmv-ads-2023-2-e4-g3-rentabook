import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import * as yup from 'yup';

const validateLoginForm = async (email, password) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
  });

  return validationSchema.validate({ email, password }, { abortEarly: false });
};

export default function Login() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? 'LANDSCAPE' : 'PORTRAIT');
  const navigation = useNavigation<StackTypes>();
  const [validationErrors, setValidationErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const onChange = ({ window: { width, height } }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleInputChange = (field, value) => {
    setValidationErrors({ ...validationErrors, [field]: '' });

    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  const handleValidationErrors = (error) => {
    const errors = { email: '', password: '' };

    error.inner.forEach((e) => {
      if (e.path === 'email') {
        errors.email = e.message;
      }
      if (e.path === 'password') {
        errors.password = e.message;
      }
    });

    setValidationErrors(errors);
  };

  const clearValidationErrors = () => {
    setValidationErrors({ email: '', password: '' });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: orientation === 'LANDSCAPE' ? 'row' : 'column-reverse',
      backgroundColor: "#E1DCC5",
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputSection: {
      flexBasis: orientation === 'LANDSCAPE' ? '60%' : '75%',
      padding: 20,
      maxWidth: 400,
      alignItems: 'center',
    },
    welcomeSection: {
      flexBasis: orientation === 'LANDSCAPE' ? '40%' : '25%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      marginVertical: 10,
      fontSize: 20,
      height: 60,
      width: '100%',
      paddingHorizontal: 10,
    },
    welcomeText: {
      fontSize: 24,
      textAlign: 'center',
      margin: 20,
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
  });

  const handleLogin = async () => {
    try {
      await validateLoginForm(email, password);

      const isAuthenticated = await auth.login({ email, password });

      if (isAuthenticated) {
        navigation.navigate("Anúncios", {});
      } else {
        setLoginError("Credenciais inválidas");
        clearValidationErrors();
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        handleValidationErrors(error);
      } else {
        console.error(error);
        setLoginError("Ocorreu um erro no login. Verifique suas credenciais e tente novamente.");
      }
    }
  };

  return (
    <ResponsiveNavbar>
      <View style={styles.container}>
        <View style={styles.inputSection}>
          <Input
            style={styles.input}
            value={email}
            placeholder="Digite seu e-mail"
            label="Email"
            onChangeText={(value) => handleInputChange('email', value)}
          />
          {validationErrors.email && <Text style={styles.errorText}>{validationErrors.email}</Text>}
          <Input
            style={styles.input}
            value={password}
            placeholder="Digite sua senha"
            label="Senha"
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={true}
          />
          {validationErrors.password && <Text style={styles.errorText}>{validationErrors.password}</Text>}
          {loginError && <Text style={styles.errorText}>{loginError}</Text>}
          <PrimaryButton
            style={styles.input}
            onPress={handleLogin}
            label="Entrar"
          />
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bem-vindo de volta! Faça login na sua conta</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}