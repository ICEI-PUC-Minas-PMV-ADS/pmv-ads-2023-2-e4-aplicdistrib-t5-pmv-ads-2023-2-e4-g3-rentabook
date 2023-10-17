
import Home from '../pages/Template';
import MyAnnouncements from '../pages/MyAnnoucements';
import { NavigationContainer } from '@react-navigation/native';
import { AppParamsList } from './AppParamsList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RequireAuth } from '../contexts/Auth/RequireAuth';
import Login from '../pages/Login';


const Stack = createNativeStackNavigator<AppParamsList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='MyAnnouncements' options={{ headerShown: false }}>
          {() => (
            <RequireAuth>
              <MyAnnouncements />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}