import Home from '../pages/Home';
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
import AnnouncementsDetails from '../pages/AnnouncementsDetails';


const Stack = createNativeStackNavigator<AppParamsList>();

const home = 'Anúncios'
const myAnnouncements = 'Meus Anúncios'
const login = 'Entrar'
const profile = 'Meu Perfil'
const chat = 'Mensagens'
const signup = 'Criar Conta'
const announcementsDetails = 'Detalhes do anúncio'

export default function Router() {
  return (<>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={home}
        screenOptions={{
          headerShown: false, animation: 'none'
        }}>
        <Stack.Screen name={home} component={Home} />
        <Stack.Screen name={announcementsDetails} component={AnnouncementsDetails} />
        <Stack.Screen name={myAnnouncements}>
          {() => (
            <RequireAuth>
              <MyAnnouncements />
            </RequireAuth>
          )
          }
        </Stack.Screen>
        <Stack.Screen name={login}>
          {() => (
            <AlreadyLogged>
              <Login />
            </AlreadyLogged>
          )}
        </Stack.Screen>
        <Stack.Screen name={profile}>
          {() => (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name={chat}>
          {() => (
            <RequireAuth>
              <Chat />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name={signup}>
          {() => (
            <AlreadyLogged>
              <Signup />
            </AlreadyLogged>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer >
  </>
  )
}