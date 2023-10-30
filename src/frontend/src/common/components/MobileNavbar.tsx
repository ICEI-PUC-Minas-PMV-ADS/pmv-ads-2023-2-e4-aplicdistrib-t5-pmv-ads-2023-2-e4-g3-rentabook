import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { DarkGreen, GreenLight, PrimaryGreenColor } from "../theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { StackTypes } from "../../routes/StackTypes";
import Ionicons from '@expo/vector-icons/Ionicons';

const style = StyleSheet.create({
  navbar: {
    backgroundColor: GreenLight,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    padding: 10,
  },
  linkContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  navLink: {
    color: PrimaryGreenColor,
    fontSize: 12,
    fontWeight: "normal",
    padding: 2,
  },
  activeNavLink: {
    color: DarkGreen,
    fontSize: 12,
    fontWeight: "normal",
    padding: 2,
  },
  icon: {
    width: 54,
    height: 54,
  },
});

export default function MobileNavbar() {
  const navigation = useNavigation<StackTypes>()
  const authContext = React.useContext(AuthContext)
  const telaAtual = useRoute().name

  return (
    <View style={style.navbar}>
      {
        telaAtual == 'Anúncios' &&
        <Pressable
          style={style.linkContainer}
          onPress={() => navigation.navigate('Anúncios', {})}>
          <Ionicons name='home' size={28} color={DarkGreen} />
          <Text style={style.activeNavLink}>Anúncios</Text>
        </Pressable>
      }
      {
        telaAtual != 'Anúncios' &&
        <Pressable
          style={style.linkContainer}
          onPress={() => navigation.navigate('Anúncios', {})}>
          <Ionicons name='home-outline' size={28} color={PrimaryGreenColor} />
          <Text style={style.navLink}>Anúncios</Text>
        </Pressable>
      }
      {authContext.user &&
        <>
          {
            telaAtual == 'Meus Anúncios' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Meus Anúncios', {})}>
              <Ionicons name='bookmark' size={28} color={DarkGreen} />
              <Text style={style.activeNavLink}>Meus Anúncios</Text>
            </Pressable>
          }
          {
            telaAtual != 'Meus Anúncios' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Meus Anúncios', {})}>
              <Ionicons name='bookmark-outline' size={28} color={PrimaryGreenColor} />
              <Text style={style.navLink}>Meus Anúncios</Text>
            </Pressable>
          }
          {
            telaAtual == 'Mensagens' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Chat', {})}>
              <Ionicons name='chatbox-ellipses' size={28} color={DarkGreen} />
              <Text style={style.activeNavLink}>Mensagens</Text>
            </Pressable>
          }
          {
            telaAtual != 'Mensagens' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Chat', {})}>
              <Ionicons name='chatbox-ellipses-outline' size={28} color={PrimaryGreenColor} />
              <Text style={style.navLink}>Mensagens</Text>
            </Pressable>
          }
          {
            telaAtual == 'Meu Perfil' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Meu Perfil', {})}>
              <Ionicons name='person-circle' size={28} color={DarkGreen} />
              <Text style={style.activeNavLink}>Meu Perfil</Text>
            </Pressable>
          }
          {
            telaAtual != 'Meu Perfil' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Meu Perfil', {})}>
              <Ionicons name='person-circle-outline' size={28} color={PrimaryGreenColor} />
              <Text style={style.navLink}>Meu Perfil</Text>
            </Pressable>
          }
        </>
      }
      {!authContext.user &&
        <>
          {
            telaAtual == 'Criar Conta' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Criar Conta', {})}>
              <Ionicons name='person-add' size={28} color={DarkGreen} />
              <Text style={style.activeNavLink}>Criar conta</Text>
            </Pressable>
          }
          {
            telaAtual != 'Criar Conta' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Criar Conta', {})}>
              <Ionicons name='person-add-outline' size={28} color={PrimaryGreenColor} />
              <Text style={style.navLink}>Criar conta</Text>
            </Pressable>
          }
          {
            telaAtual == 'Entrar' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Entrar', {})}>
              <Ionicons name='log-in' size={28} color={DarkGreen} />
              <Text style={style.activeNavLink}>Entrar</Text>
            </Pressable>
          }
          {
            telaAtual != 'Entrar' &&
            <Pressable
              style={style.linkContainer}
              onPress={() => navigation.navigate('Entrar', {})}>
              <Ionicons name='log-in-outline' size={28} color={PrimaryGreenColor} />
              <Text style={style.navLink} onPress={() => navigation.navigate('Entrar', {})}>Entrar</Text>
            </Pressable>
          }
        </>
      }
    </View>
  );
}
