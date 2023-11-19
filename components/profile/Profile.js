import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuNav from '../menu/MenuNav';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Profile() {
  const navigation = useNavigation();

  const logout = async () => {

      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
  };
  
 return (
    <View style={styles.view}>
    <Text >EN DESARROLLO.......</Text>

    <TouchableOpacity
        onPress={logout}
      >
        <Text style={{color:'red'}}>SALIR</Text>
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
