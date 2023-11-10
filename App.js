import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './components/profile/Profile';
import QRCodeScanner from './components/scaner/Permission';
import Main from './components/main/Main';
import History from './components/history/History';
import Login from './components/login/Login';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" >
      <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Scaner" component={QRCodeScanner} />
      <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
