import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { DarkGreen, GreenLight, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { StackTypes } from "../../routes/StackTypes";

const Icone: ImageSourcePropType = require("../assets/icon.png");
const IconeDois: ImageSourcePropType = require("../assets/IconDois.png");

const style = StyleSheet.create({
  navbar: {
    backgroundColor: GreenLight,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  navLinkContainer: {
    flexDirection: "row",
  },
  navLinks: {
    flexDirection: "row",
    marginRight: 30,
  },
  navLink: {
    color: PrimaryGreenColor,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "normal",
    padding: 10,
  },
  activeNavLink: {
    color: DarkGreen,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "normal",
    padding: 10,
  },
  icon: {
    width: 54,
    height: 54,
  },
});


export default function DesktopNavbar() {
  const navigation = useNavigation<StackTypes>()
  const authContext = React.useContext(AuthContext)
  const telaAtual = useRoute().name
  const auth = React.useContext(AuthContext)

  const handleLogout = async () => {
    if (auth.user) {
      const logout = await auth.logout()
      if (logout) {
        navigation.navigate("Anúncios", {})
      }
    }
  }


  return (
    <View style={style.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Anúncios', {})}>
        <Image source={Icone} style={style.icon} />
      </TouchableOpacity>
      <View style={style.navLinkContainer}>
        {authContext.user && <Text style={style.navLink} onPress={handleLogout}> Logout</Text>}
        <View style={style.navLinks}>
          {
            telaAtual == 'Anúncios' &&
            <Text
              style={style.activeNavLink}
              onPress={() => navigation.navigate('Anúncios', {})}
            >
              Anúncios
            </Text>
          }
          {
            telaAtual != 'Anúncios' &&
            <Text
              style={style.navLink}
              onPress={() => navigation.navigate('Anúncios', {})}
            >
              Anúncios
            </Text>
          }
          {authContext.user &&
            <>

              {
                telaAtual == 'Meus Anúncios' &&
                <Text
                  style={style.activeNavLink}
                  onPress={() => navigation.navigate('Meus Anúncios', {})}
                >
                  Meus Anúncios
                </Text>
              }
              {
                telaAtual != 'Meus Anúncios' &&
                <Text
                  style={style.navLink}
                  onPress={() => navigation.navigate('Meus Anúncios', {})}
                >
                  Meus Anúncios
                </Text>
              }
              {
                telaAtual == 'Mensagens' &&
                <Text style={style.activeNavLink} onPress={() => navigation.navigate('Mensagens', {})}>
                  Mensagens
                </Text>
              }
              {
                telaAtual != 'Mensagens' &&
                <Text style={style.navLink} onPress={() => navigation.navigate('Mensagens', {})}>
                  Mensagens
                </Text>
              }

            </>
          }
          {!authContext.user &&
            <>
              {
                telaAtual == 'Criar Conta' &&
                <Text
                  style={style.activeNavLink}
                  onPress={() => navigation.navigate('Criar Conta', {})}
                >
                  Criar conta
                </Text>
              }
              {
                telaAtual != 'Criar Conta' &&
                <Text
                  style={style.navLink}
                  onPress={() => navigation.navigate('Criar Conta', {})}
                >
                  Criar conta
                </Text>
              }
              {
                telaAtual == 'Entrar' &&
                <Text style={style.activeNavLink} onPress={() => navigation.navigate('Entrar', {})}>
                  Entrar
                </Text>
              }
              {
                telaAtual != 'Entrar' &&
                <Text style={style.navLink} onPress={() => navigation.navigate('Entrar', {})}>
                  Entrar
                </Text>
              }
            </>
          }
        </View>

        {authContext.user &&
          <TouchableOpacity onPress={() => navigation.navigate('Meu Perfil', {})}>
            <Image source={IconeDois} style={style.icon} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}
