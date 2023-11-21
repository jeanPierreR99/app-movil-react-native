import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuNav from '../menu/MenuNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';


function Profile() {
  const [user, setUser]=useState("")


  const getUserStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    const objUser = JSON.parse(user);
    setUser(objUser)
  };
  useEffect(() => {
    getUserStorage()
  }, []);
  
  // id,
  // career,
  // dni,
  // email,
  // firstName,
  // lastName,
  // phone,
  // access_token

 return (
    <View style={styles.container}>
      <Text style={styles.title}>DATOS PERSONALES</Text>
    <View style={styles.item}>
      <Text style={styles.itemText}>CARRERA:</Text>
      <TextInput
      style={styles.itemInputText}
      value={user.career}
      editable={false}
      />
    </View>
    <View style={styles.item}>
      <Text style={styles.itemText}>DNI:</Text>
      <TextInput
      style={styles.itemInputText}
      value={user.dni}
      editable={false}
      />
    </View>
    <View style={styles.item}>
      <Text style={styles.itemText}>EMAIL:</Text>
      <TextInput
      style={styles.itemInputText}
      value={user.email}
      editable={false}
      />
    </View>
    <View style={styles.item}>
      <Text style={styles.itemText}>NOMBRES:</Text>
      <TextInput
      style={styles.itemInputText}
      value={user.firstName}
      editable={false}
      />
    </View>
    <View style={styles.item}>
      <Text style={styles.itemText}>APELLIDOS:</Text>
      <TextInput
      style={styles.itemInputText}
      value={user.lastName}
      editable={false}
      />
    </View>
    <View style={styles.item}>
      <Text style={styles.itemText}>TELEFONO:</Text>
      <TextInput
      style={styles.itemInputText}
      value={user.phone}
      editable={false}
      />
    </View>
    <MenuNav showMenu={true}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:20
  },
  title:{
    fontSize:20,
    alignSelf:'center',
    fontWeight:'600',
  },
  item:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    paddingRight:20,
    paddingLeft:20,
    padding:10
  },
  itemText:{
    fontSize:18,
    fontWeight:'400',
  },
  itemInputText:{
    fontSize:18,
    color:'gray',
    backgroundColor:'#ebebeb',
    height:30,
    padding:5,
  }

})
export default Profile;
