import Home from '../pages/Home';
import MyAnnouncements from '../pages/MyAnnouncements';
import { NavigationContainer } from '@react-navigation/native';
import { AppParamsList } from './AppParamsList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RequireAuth } from '../contexts/Auth/RequireAuth';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';
import Signup from '../pages/Signup';
import { AlreadyLogged } from '../contexts/Auth/AlreadyLogged';
import AnnouncementsDetails from '../pages/AnnouncementDetails'
import React from 'react';
import SearchMobile from '../pages/Home/SearchMobile';
import { CreateAnnouncement } from '../pages/CreateAnnouncement';
import CreateRating from '../pages/CreateRating';


const Stack = createNativeStackNavigator<AppParamsList>();

const home = 'Anúncios'
const myAnnouncements = 'Meus Anúncios'
const createAnnouncement = 'Criar Anúncio'
const login = 'Entrar'
const profile = 'Meu Perfil'
const chat = 'Chat'
const signup = 'Criar Conta'
const announcementsDetails = 'Detalhes do anúncio'
const createRating = 'Avalie a negociação'

export default function Router() {
  return (<>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={home}
        screenOptions={{
          headerShown: false, animation: 'none'
        }}>
        <Stack.Screen name={profile} component={Profile} />
        <Stack.Screen name={home} component={Home} />
        <Stack.Screen name={announcementsDetails} component={AnnouncementsDetails} />
        <Stack.Screen name={createRating} component={CreateRating} />
        <Stack.Screen name={myAnnouncements}>
          {() => (
            <RequireAuth>
              <MyAnnouncements />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name={createAnnouncement}>
          {() => (
            <RequireAuth>
              <CreateAnnouncement />
            </RequireAuth>
          )}
        </Stack.Screen>
        <Stack.Screen name={login}>
          {() => (
            <AlreadyLogged>
              <Login />
            </AlreadyLogged>
          )}
        </Stack.Screen>
        {/* <Stack.Screen name={profile}>
          {() => (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          )}
        </Stack.Screen> */}
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

