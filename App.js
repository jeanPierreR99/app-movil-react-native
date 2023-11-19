import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './components/profile/Profile';
import QRCodeScanner from './components/scaner/Permission';
import Main from './components/main/Main';
import History from './components/history/History';
import Login from './components/login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

 function App() {
  const [user, setUser] = useState("");

  const getUserStorage = async () => {
  
    const user = await AsyncStorage.getItem('user');
    const objUser = JSON.parse(user);
    setUser(objUser)

};

  useEffect(() => {
   getUserStorage()
  }, []);

  if (user === "") {
    return;
  }
  return (
    <NavigationContainer>
       {user && user.id && user.email ? (
        <>
      <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Scaner" component={QRCodeScanner} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
            </>
        ) : (
          <>
            <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Scaner" component={QRCodeScanner} />
            <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
          </>
        )}
    </NavigationContainer>
  );
}

export default App;

