import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

function Main() {
  const navigation = useNavigation();

  return (
    <View className="bg-white flex-1">
      <View className="mt-[100px] w-[70%] h-[40%] self-center">
        <Image
          source={require("../../../assets/logo_unamad.png")}
          className="w-full h-full"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <Text className="w-[70%] self-center text-center text-[16px] font-bold text-green-500">
        Servicio de asistencia digital de los centros universitarios de
        conectividad.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-[60px] bg-green-500 flex-row p-2 w-[70%] self-center justify-around rounded-md"
      >
        <Text className="text-white text-xl self-center">Empecemos</Text>
        <Icon name="arrow-right" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default Main;
