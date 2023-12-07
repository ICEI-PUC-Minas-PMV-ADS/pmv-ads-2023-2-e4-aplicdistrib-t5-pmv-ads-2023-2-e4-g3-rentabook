import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from 'yup';
import { AuthContext } from '../contexts/Auth/AuthContext';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import { StackTypes } from "../routes/StackTypes";

export default function Login() {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<StackTypes>()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    const errors = { ...validationErrors };
    delete errors[field];
    setValidationErrors(errors);
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const updateOrientation = () => {
    setOrientation(
      Dimensions.get('window').width > Dimensions.get('window').height
        ? 'LANDSCAPE'
        : 'PORTRAIT'
    );
  };

  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? 'LANDSCAPE'
      : 'PORTRAIT'
  );

  useEffect(() => {
    const changeOrientation = () => {
      setOrientation(
        Dimensions.get('window').width > Dimensions.get('window').height
          ? 'LANDSCAPE'
          : 'PORTRAIT'
      );
    };

    Dimensions.addEventListener("change", changeOrientation);

    return () => {
      //Dimensions.removeEventListener("change", changeOrientation);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const validationSchema = yup.object().shape({
        email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
        password: yup.string().required("Senha é obrigatória"),
      });

      await validationSchema.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      );

      const isAuthenticated = await authContext.login({ email, password });

      if (isAuthenticated) {
        setEmail('');
        setPassword('');
        setValidationErrors({
          email: '',
          password: '',
        });
        navigation.navigate("Anúncios", {});
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce((acc, e) => {
          acc[e.path] = e.message;
          return acc;
        }, {});
        setValidationErrors(errors);
      } else {
        console.error(error);
      }
    }
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
      flexBasis: orientation === 'LANDSCAPE' ? '50%' : '70%',
      padding: 20,
      maxWidth: 400,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeSection: {
      flexBasis: orientation === 'LANDSCAPE' ? '50%' : '30%',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    welcomeText: {
      fontSize: 24,
      textAlign: 'center',
      margin: 20,
      color: '#FFFFFF',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    input: {
      marginVertical: 10,
      fontSize: 20,
      height: 60,
      width: '100%',
      paddingHorizontal: 10,
    },
    button: {
      height: 45,
      width: 340,
      marginTop: 20,
    },
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
            onChangeText={(value) => handleInputChange('email', value)}
            error={validationErrors.email}
          />
          {validationErrors.email && <Text style={{ color: 'red' }}>{validationErrors.email}</Text>}
          <Input
            style={styles.input}
            value={password}
            placeholder="Digite sua senha"
            label="Senha"
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={true}
            error={validationErrors.password}
          />
          {validationErrors.password && <Text style={{ color: 'red' }}>{validationErrors.password}</Text>}
          <PrimaryButton
            style={styles.button}
            onPress={handleLogin}
            label="Entrar"
          />
        </View>
        <View style={styles.welcomeSection}>
          <Image
            source={require('../../assets/auth-background.png')}
            style={styles.backgroundImage}
          />
          <Text style={styles.welcomeText}>Bem-vindo de volta! Faça o login na sua conta</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}