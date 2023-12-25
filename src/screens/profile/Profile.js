import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import DrawerHeader from '../../navigation/DrawerHeader'

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
      <DrawerHeader></DrawerHeader>
      <Text className="text-xl ml-5 font-bold text-center text-green-500">DATOS PERSONALES</Text>
    <View className="my-2 px-5">
      <Text className="font-bold text-gray-600">CARRERA:</Text>
      <TextInput
      className="text-lg bg-gray-200 rounded-md text-gray-500 p-1"
      value={user.career}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="font-bold text-gray-600">DNI:</Text>
      <TextInput
      className="text-lg bg-gray-200 rounded-md text-gray-500 p-1"
      value={user.dni}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="font-bold text-gray-600">EMAIL:</Text>
      <TextInput
      className="text-lg bg-gray-200 rounded-md text-gray-500 p-1"
      value={user.email}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="font-bold text-gray-600">NOMBRES:</Text>
      <TextInput
      className="text-lg bg-gray-200 rounded-md text-gray-500 p-1"
      value={user.firstName}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="font-bold text-gray-600">APELLIDOS:</Text>
      <TextInput
      className="text-lg bg-gray-200 rounded-md text-gray-500 p-1"
      value={user.lastName}
      editable={false}
      />
    </View>
    <View className="my-2 px-5">
      <Text className="font-bold text-gray-600">TELEFONO:</Text>
      <TextInput
      className="text-lg bg-gray-200 rounded-md text-gray-500 p-1"
      value={user.phone}
      editable={false}
      />
    </View>
    </View>
  );
}

export default Profile;
