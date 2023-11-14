import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCredentials = async (username, password) => {
  try {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
  } catch (error) {
    console.error('Error al guardar las credenciales:', error);
  }
};

const getCredentials = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');
    return { username, password };
  } catch (error) {
    console.error('Error al obtener las credenciales:', error);
  }
};

const verifyStorage = async () => {
    const credentials = await getCredentials();
    if (credentials && credentials.username && credentials.password) {
    } else {
    }
  };
  
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      // Además, realiza cualquier otra acción necesaria al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  export default{
    saveCredentials,
    getCredentials
  }