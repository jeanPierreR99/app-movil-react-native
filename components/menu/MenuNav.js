import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

function MenuNav({ showMenu }) {
  const navigation = useNavigation();
  if (!showMenu) {
    return null;
  }
  return (
    <View className="absolute flex-row bottom-0 justify-around items-center bg-[#e93373] h-[70px] w-full">
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        className="flex-col items-center"
      >
        <Icon name="user" size={30} color="white" />
        <Text className="text-white text-[20px]">Mi cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Scaner")}
        className="bg-white rounded-full justify-center top-[-20px] border-[#e93373] border-[3px] h-20 items-center w-20"
      >
        <View className="">
          <Icon name="qrcode" size={40} color="#e93373" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("History")}
        className="flex-col items-center"
      >
        <Icon name="history" size={30} color="white" />
        <Text className="text-white text-[20px]">Historial</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MenuNav;
