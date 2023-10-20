
import Home from '../pages/Template';
import MyAnnouncements from '../pages/MyAnnoucements';
import { NavigationContainer } from '@react-navigation/native';
import { AppParamsList } from './AppParamsList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RequireAuth } from '../contexts/Auth/RequireAuth';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import Signup from '../pages/Signup';
import { AlreadyLogged } from '../contexts/Auth/AlreadyLogged';


const Stack = createNativeStackNavigator<AppParamsList>();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MyAnnouncements'>
          {() => (
            <RequireAuth>
              <MyAnnouncements />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name='Login'>
          {() => (
            <AlreadyLogged>
              <Login />
            </AlreadyLogged>
          )}
        </Stack.Screen>
        <Stack.Screen name='Profile'>
          {() => (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name='Chat'>
          {() => (
            <RequireAuth>
              <Chat />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name='Signup'>
          {() => (
            <AlreadyLogged>
              <Signup />
            </AlreadyLogged>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}