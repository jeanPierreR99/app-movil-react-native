import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const DrawerHeader = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.touch}>
      <Icon name="bars" size={34} color={"#838584f7"} style={styles.icon}/>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    touch: {
      width:40,
      height:30,
      alignSelf:"flex-end",
      marginRight:10,
    },
    icon:{
        alignSelf:"center",
    }
  });
export default DrawerHeader;
