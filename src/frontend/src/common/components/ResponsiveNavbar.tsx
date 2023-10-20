import { View } from "react-native";
import { isDesktop } from "../../hooks/useResposive";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function ResponsiveNavbar({ children }: { children: JSX.Element }) {
  if (isDesktop()) {
    return (
      <View style={{ flex: 1 }}>
        <DesktopNavbar />
        {children}
      </View>
    )
  }
  else return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      {children}
      <MobileNavbar />
    </View>
  );
}
