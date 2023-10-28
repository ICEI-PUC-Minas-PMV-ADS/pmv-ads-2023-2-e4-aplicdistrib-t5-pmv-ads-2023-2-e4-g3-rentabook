import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from 'yup';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { StackTypes } from '../routes/StackTypes';
import Input from '../common/components/Input';
import PrimaryButton from '../common/components/PrimaryButton';
import ResponsiveNavbar from "../common/components/ResponsiveNavbar";

export default function Signup() {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<StackTypes>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? 'LANDSCAPE'
      : 'PORTRAIT'
  );

  const handleInputChange = (field, value) => {
    const errors = { ...validationErrors };
    delete errors[field];
    setValidationErrors(errors);
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

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
      .oneOf([yup.ref('password'), null], 'As senhas não correspondem')
      .required("Confirmação de senha é obrigatória"),
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

      const isRegistered = await authContext.signup({ name, email, password });

      if (isRegistered) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setValidationErrors({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        throw new Error("Erro ao cadastrar o usuário");
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
    buttom:{
      height: 45,
      width: 340,
      marginTop: 20
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
            onChangeText={(value) => handleInputChange('name', value)}
            error={validationErrors.name}
          />
          {validationErrors.name && <Text style={{ color: 'red' }}>{validationErrors.name}</Text>}
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
          <Input
            style={styles.input}
            value={confirmPassword}
            placeholder="Confirme sua senha"
            label="Confirme a senha"
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry={true}
            error={validationErrors.confirmPassword}
          />
          {validationErrors.confirmPassword && <Text style={{ color: 'red' }}>{validationErrors.confirmPassword}</Text>}
          <PrimaryButton
            style={styles.buttom}
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