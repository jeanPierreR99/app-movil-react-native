import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { menuItems } from "../constants";
import { useLogin } from "./context/LoginProvider";

const DrawerContent = () => {
  const { setIsLogin } = useLogin();
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [userStorage, setUserStorage] = useState("");
  const [initial, setInitial] = useState("");
  const [career, setCareer] = useState("");
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    setSelectedMenu(screenName);
    navigation.navigate(screenName);
  };

  const sesionDestroy = async () => {
    await AsyncStorage.clear();
    setIsLogin(false);
  };

  useEffect(() => {
    const storageGet = async () => {
      const user = await AsyncStorage.getItem("user");
      const objUser = JSON.parse(user);
      if (objUser) {
        setUserStorage(objUser.firstName);
        setInitial(objUser.initial);
        setCareer(objUser.career);
        console.log(userStorage);
      }
    };
    storageGet();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.profileContainer}
        colors={["#12a726", "#51e585"]} // Colores para el degradado
        start={{ x: 0, y: 0 }} // Punto de inicio del degradado
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.avatar}>{initial != " " ? initial : "U"}</Text>
        <Text style={styles.username}>{userStorage}</Text>
        <Text style={styles.career}>{career}</Text>
      </LinearGradient>
      {menuItems.map((menuItems) => (
        <TouchableOpacity
          key={menuItems.name}
          onPress={() => navigateToScreen(menuItems.navigationName)}
          style={[
            styles.item,
            {
              backgroundColor:
                selectedMenu === menuItems.navigationName
                  ? "#12a72638"
                  : "transparent",
            },
          ]}
        >
          <Icon
            name={menuItems.iconName}
            size={25}
            color={
              selectedMenu === menuItems.navigationName ? "green" : "#838584f7"
            }
          />
          <Text
            style={[
              styles.itemText,
              {
                color:
                  selectedMenu === menuItems.navigationName
                    ? "green"
                    : "#838584f7",
              },
            ]}
          >
            {menuItems.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => sesionDestroy()} style={styles.item}>
        <Icon
          name={"power-off"}
          size={25}
          color={
            selectedMenu === menuItems.navigationName ? "green" : "#838584f7"
          }
        />
        <Text style={[styles.itemText, { color: "#838584f7" }]}>
          Cerrar sesion
        </Text>
      </TouchableOpacity>
      <ImageBackground
        source={require("../../assets/logo.png")}
        style={styles.image}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    flex: 1,
  },
  profileContainer: {
    padding: 16,
    paddingTop: 40,
    paddingBottom:40,
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 44,
    fontWeight: "bold",
    color: "#12a726",
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  career: {
    fontSize: 15,
    color: "white",
  },
  item: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    gap: 30,
    paddingLeft: 16,
    // backgroundColor:"#12a72638",
    borderRadius: 6,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    bottom: "5%",
    opacity: 0.8,
    width: 220,
    height: 220,
    alignSelf: "center",
  },
});
export default DrawerContent;
