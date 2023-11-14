import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuNav from '../menu/MenuNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCredentials = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');
    return { username, password };
  } catch (error) {
    console.error('Error al obtener las credenciales:', error);
  }
};

function Profile() {
  const navigation = useNavigation();

  const verifyStorage = async () => {
    const credentials = await getCredentials();
    if (credentials && credentials.username && credentials.password) {
    alert("existen..... codigo:"+credentials.username+" password: "+credentials.password)
    navigation.navigate('Main')
  } else {
      alert("no existe")
    }
  };
 return (
    <View style={styles.view}>
    <Text >menu profilssssssse</Text>

    <TouchableOpacity
        onPress={verifyStorage}
      >
        <Text>local storage</Text>
      </TouchableOpacity>
    <MenuNav showMenu={true}/>
    </View>
  );
}
const styles = StyleSheet.create({
  view:{
    width:'100%',
    height:'100%',
  },
})
export default Profile;
