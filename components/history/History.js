import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuNav from "../menu/MenuNav";

const Item = ({ suneduCode, title, fecha }) => (
  <View className="items-center bg-white rounded-md p-[10px] my-2 flex-row  border-2 border-[#e93373] w-full ">
    <View className="mr-2">
      <Icon name="qrcode" size={40} color="black" />
    </View>
    <View className="w-[80%]">
      <Text className="text-xl font-bold">Laboratorio: {suneduCode}</Text>
      <Text className="text-xl font-bold">Titulo: {title}</Text>
      <View className="flex-row justify-between w-full">
        <Text className="text-lg">Fecha:</Text>
        <Text className="text-lg max-w-[80%]" numberOfLines={2}>
          {fecha}
        </Text>
      </View>
    </View>
  </View>
);

const converDate =(dateOrigin)=>{
  const fecha = new Date(dateOrigin);
  
  const nameMonth = fecha.toLocaleString('es-ES', { month: 'short' });
  
  const year = fecha.getFullYear();
  
  let hour = fecha.getHours();
  let minutes = fecha.getMinutes();
  
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // Hora '0' se muestra como '12'
  
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  const newFecha = `${nameMonth} ${year} ${hour}:${minutes} ${ampm}`;
  
  return newFecha
}

const History = () => {
  const [newData, setNewData] = useState([]);
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  const getUserStorage = async () => {
    const user = await AsyncStorage.getItem("user");
    const objUser = JSON.parse(user);
    setUser(objUser);
  };

  const fetchData = async () => {
    const url = `https://cenun-api-render.onrender.com/api/attendance/all/visitor/${user.id}?lab=true&event=true$session=true`;
    const token = user.access_token;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      setNewData(data);
      setLoader(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserStorage();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView className="flex-1 pb-[70px]">
      <Text className="text-xl ml-5 mt-5 font-bold">HISTORIAL DE ASISTENCIAS</Text>
      <ImageBackground
        source={require("../../assets/borrar2.png")}
        className="flex-1 absolute w-full h-full opacity-40"
      />
      {loader ? (
        <ActivityIndicator size="x-large" color="gray" />
      ) : (
        <FlatList
          className="w-full self-center px-[20px]"
          data={newData}
          renderItem={({ item }) => (
            <Item
              suneduCode={item.lab.suneduCode}
              title={item.event.title}
              fecha={converDate(item.dateRecord.createdAt)}
            />
          )}
          keyExtractor={(item) => item.dateRecord.createdAt}
        />
      )}
      <MenuNav showMenu={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  text: {
    fontSize: 17,
    maxWidth: "80%",
  },
  textF: {
    fontSize: 17,
  },

});

export default History;
