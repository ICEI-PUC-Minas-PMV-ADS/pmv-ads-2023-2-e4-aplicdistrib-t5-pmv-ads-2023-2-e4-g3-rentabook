import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { GreenLight, PrimaryGreenColor, WhiteColor } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParamsList } from "../../routes/AppParamsList";
import { AuthContext } from "../../contexts/Auth/AuthContext";




const Icone: ImageSourcePropType = require("../assets/icon.png");
const IconeDois: ImageSourcePropType = require("../assets/IconDois.png");



const style = StyleSheet.create({
  navbar: {
    backgroundColor: GreenLight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 30,
  },
  navLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  navLink: {
    color: PrimaryGreenColor,
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


export default function NavBar() {
  const navigation = useNavigation<NativeStackNavigationProp<AppParamsList>>()
  const authContext = React.useContext(AuthContext)

  return (
    <View style={style.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home', {})}>
        <Image source={Icone} style={style.icon} />
      </TouchableOpacity>
      <View style={style.navLinkContainer}>
        <View style={style.navLinks}>
          <Text
            style={style.navLink}
            onPress={() => navigation.navigate('Home', {})}
          >
            Anúncios
          </Text>
          {authContext.user &&
            <>
              <Text
                style={style.navLink}
                onPress={() => navigation.navigate('MyAnnouncements', {})}
              >
                Meus Anúncios
              </Text>
              <Text style={style.navLink} onPress={() => navigation.navigate('Chat', {})}>
                Chat
              </Text>
            </>
          }
          {!authContext.user &&
            <>
              <Text
                style={style.navLink}
                onPress={() => navigation.navigate('Signup', {})}
              >
                Criar conta
              </Text>
              <Text style={style.navLink} onPress={() => navigation.navigate('Login', {})}>
                Entrar
              </Text>
            </>
          }
        </View>
        {authContext.user &&
          <TouchableOpacity onPress={() => navigation.navigate('Profile', {})}>
            <Image source={IconeDois} style={style.icon} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}
