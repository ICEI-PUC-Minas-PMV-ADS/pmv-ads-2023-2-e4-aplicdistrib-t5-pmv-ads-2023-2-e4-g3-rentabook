import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";
import * as yup from 'yup';

export default function Signup() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orientation, setOrientation] = useState(Dimensions.get('window').width > Dimensions.get('window').height ? 'LANDSCAPE' : 'PORTRAIT');
  const navigation = useNavigation<StackTypes>();
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const onChange = ({ window: { width, height } }) => {
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
      )
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não correspondem'),
  });

  const handleSignup = async () => {
    try {
      await validationSchema.validate(
        {
          name,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      const isRegistered = await auth.signup({ name, email, password });

      if (isRegistered) {
        navigation.navigate("Anúncios", {});
      } else {
        throw new Error("Erro ao cadastrar o usuário");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Atualize os erros de validação com mensagens específicas para cada campo
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
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
    }
  });

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
          {validationErrors.name ? (
            <Text style={{ color: 'red' }}>{validationErrors.name}</Text>
          ) : null}
          <Input
            style={styles.input}
            value={email}
            placeholder="Digite seu e-mail"
            label="Email"
            onChangeText={setEmail}
          />
          {validationErrors.email ? (
            <Text style={{ color: 'red' }}>{validationErrors.email}</Text>
          ) : null}
          <Input
            style={styles.input}
            value={password}
            placeholder="Digite sua senha"
            label="Senha"
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {validationErrors.password ? (
            <Text style={{ color: 'red' }}>{validationErrors.password}</Text>
          ) : null}
          <Input
            style={styles.input}
            value={confirmPassword}
            placeholder="Confirme sua senha"
            label="Confirme a senha"
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          {validationErrors.confirmPassword ? (
            <Text style={{ color: 'red' }}>{validationErrors.confirmPassword}</Text>
          ) : null}
          <PrimaryButton
            style={styles.input}
            onPress={handleSignup}
            label="Continuar"
          />
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Bem-vindo ao Rentabook! Crie uma nova conta</Text>
        </View>
      </View>
    </ResponsiveNavbar>
  );
}