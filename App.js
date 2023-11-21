import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './components/profile/Profile';
import QRCodeScanner from './components/scaner/Permission';
import Main from './components/main/Main';
import History from './components/history/History';
import Login from './components/login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './components/register/Register';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <Stack.Screen name="Profile" component={Profile}
           options={ ({navigation}) => ({
            title: 'Mi cuenta',
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={async() => {
                  await AsyncStorage.clear();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                  });
                }}
              >
                 <Icon name="close" size={30} color="red" />
              </TouchableOpacity>
            ),
          })}
            />
            <Stack.Screen name="Scaner" component={QRCodeScanner}
            options={ ({navigation}) => ({
              title: 'QR',
              headerLeft:null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={async() => {
                    await AsyncStorage.clear();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Main' }],
                    });
                  }}
                >
                   <Icon name="close" size={30} color="red" />
                </TouchableOpacity>
              ),
            })}
            />
            <Stack.Screen name="History" component={History} 
             options={ ({navigation}) => ({
              title: 'Historial',
              headerLeft:null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={async() => {
                    await AsyncStorage.clear();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Main' }],
                    });
                  }}
                >
                   <Icon name="close" size={30} color="red" />
                </TouchableOpacity>
              ),
            })}
            />
            <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} 
               options={ () => ({
                title: 'Inicio de sesion',
              })
            }
            />
            <Stack.Screen name="Register" component={Register} 
               options={ () => ({
                title: 'Formulario de registro',
              })
            }
            />
      </Stack.Navigator>
            </>
        ) : (
          <>
            <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} 
              options={ () => ({
                title: 'Inicio de sesion',
              })
            }
            />
            <Stack.Screen name="Register" component={Register} 
            options={ () => ({
              title: 'Formulario de registro',
            })
          }
            />
            <Stack.Screen name="Profile" component={Profile} 
              options={ ({navigation}) => ({
                title: 'Mi cuenta',
                headerRight: () => (
                  <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={async() => {
                      await AsyncStorage.clear();
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' }],
                      });
                    }}
                  >
                     <Icon name="close" size={30} color="red" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Scaner" component={QRCodeScanner} 
             options={ ({navigation}) => ({
              title: 'QR',
              headerLeft:null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={async() => {
                    await AsyncStorage.clear();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Main' }],
                    });
                  }}
                >
                   <Icon name="close" size={30} color="red" />
                </TouchableOpacity>
              ),
            })}
            />
            <Stack.Screen name="History" component={History} 
             options={ ({navigation}) => ({
              title: 'Historial',
              headerLeft:null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={async() => {
                    await AsyncStorage.clear();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Main' }],
                    });
                  }}
                >
                   <Icon name="close" size={30} color="red" />
                </TouchableOpacity>
              ),
            })}
            />
      </Stack.Navigator>
          </>
        )}
    </NavigationContainer>
  );
}

export default App;

