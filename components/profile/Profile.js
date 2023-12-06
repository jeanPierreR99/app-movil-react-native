import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
    <View className="flex-1 pt-[20px]">
      <Text className="text-xl ml-5 font-bold">DATOS PERSONALES</Text>
    <View className="my-2 px-5">
      <Text className="text-lg font-bold">CARRERA:</Text>
      <TextInput
      className="text-lg bg-[#ebebeb] text-gray-500 p-1"
      value={user.career}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="text-lg font-bold">DNI:</Text>
      <TextInput
      className="text-lg bg-[#ebebeb] text-gray-500 p-1"
      value={user.dni}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="text-lg font-bold">EMAIL:</Text>
      <TextInput
      className="text-lg bg-[#ebebeb] text-gray-500 p-1"
      value={user.email}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="text-lg font-bold">NOMBRES:</Text>
      <TextInput
      className="text-lg bg-[#ebebeb] text-gray-500 p-1"
      value={user.firstName}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="text-lg font-bold">APELLIDOS:</Text>
      <TextInput
      className="text-lg bg-[#ebebeb] text-gray-500 p-1"
      value={user.lastName}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="text-lg font-bold">TELEFONO:</Text>
      <TextInput
      className="text-lg bg-[#ebebeb] text-gray-500 p-1"
      value={user.phone}
      editable={false}
      />
    </View>
    <MenuNav showMenu={true}/>
    </View>
  );
}

export default Profile;
