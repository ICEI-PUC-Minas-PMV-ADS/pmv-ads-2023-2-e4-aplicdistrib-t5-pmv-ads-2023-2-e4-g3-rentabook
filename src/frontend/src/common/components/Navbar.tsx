import { View } from "react-native";
import { isDesktop } from "../../hooks/useResposive";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

export default function NavBar({ children }: { children: JSX.Element }) {
  if (isDesktop()) {
    return (
      <View style={{ flex: 1 }}>
        <NavBarDesktop />
        {children}
      </View>
    )
  }
  else return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      {children}
      <NavBarMobile />
    </View>
  )
}
