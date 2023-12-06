import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const saveUserStorage = async (
  id,
  career,
  dni,
  email,
  firstName,
  lastName,
  phone,
  access_token
) => {
  const obj = {
    id,
    career,
    dni,
    email,
    firstName,
    lastName,
    phone,
    access_token,
  };
  const objJSON = JSON.stringify(obj);
  await AsyncStorage.setItem("user", objJSON);
  console.log("Objeto guardado correctamente");
};

const url = "https://cenun-api-render.onrender.com/api/auth/login/visitor";

const Login = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const postLogin = async (code_, password_) => {
    try {
      const data = {
        email: code_,
        password: password_,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setLoading(false);
      return res;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  };

  const getAccount = (id, token) => {
    urlAccount = `https://cenun-api-render.onrender.com/api/visitor/${id}?events=true&attendances=true`;

    fetch(urlAccount, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.studentCode) {
          console.log("succefull");
          saveUserStorage(
            data.id,
            data.career,
            data.account.dni,
            data.account.email,
            data.account.firstName,
            data.account.lastName,
            data.account.phone,
            token
          );
          navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          });
        } else {
          console.log("no succefull");
        }
      })
      .catch(() => {
        console.log("no succefull");
      });
  };

  const loginClick = async () => {
    console.log("click");
    if (code != "" && password != "") {
      setLoading(true);
      const log = await postLogin(code, password);

      if (log && log.visitor) {
        getAccount(log.visitor.id, log.access_token);
      } else {
        Alert.alert("credenciales incorrectas");
      }
    } else {
      Alert.alert("Rellene los campos");
    }
  };

  registerClick = () => {
    navigation.navigate("Register");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex-1 bg-white justify-center">
      <View className="w-[80%] self-center shadow shadow-gray-700 bg-white z-[1] rounded-md border-t-[4px] border-b-[4px] border-[#e93373] items-center ">
        <ImageBackground
          source={require("../../assets/logo.png")}
          className="w-[220px] h-[220px] self-center mt-[20px]"
        />
        <View className="w-[80%] p-[10px]">
          <Text className="text-[15px] font-bold mb-[7px]">Usuario</Text>
          <TextInput
            className="h-[40px] bg-white border border-[#e93373] rounded-md text-[16px] p-[7px] text-[#5c5d5f] shadow-md shadow-rose-500"
            placeholder="Email o código de estudiante"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setCode(text)}
          />
        </View>
        <View className="w-[80%] p-[10px]">
          <Text className="text-[15px] font-bold mb-[7px]">Contraseña</Text>
          <View className="relative">
            <TextInput
              className="h-[40px] bg-white border border-[#e93373] rounded-md text-[16px] p-[7px] text-rose-500 shadow-md shadow-rose-500"
              placeholder="Ingrese su contraseña"
              placeholderTextColor="#003f5c"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-[10px] top-[5px]"
            >
              {showPassword ? (
                <Icon
                  name="eye-slash"
                  size={30}
                  color="#e93373"
                  opacity={0.8}
                />
              ) : (
                <Icon name="eye" size={30} color="#e93373" opacity={0.5} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={loginClick}
          className="w-9/12 bg-[#e93373] h-[40px] rounded-md items-center justify-center my-[20px] "
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="color-white text-xl">Iniciar sesión</Text>
          )}
        </TouchableOpacity>
        <View className="mb-[20px] w-[90%] items-center">
          <Text className="text-[15px] font-bold mb-[7px]">
            ¿Todavia no tienes una cuenta?.{" "}
            <Text className="text-[#e93373]" onPress={registerClick}>
              Registrarse
            </Text>
          </Text>
        </View>
      </View>
      <ImageBackground
        source={require("../../assets/borrar2.png")}
        className="flex-1 absolute w-full h-full opacity-40"
      />
    </View>
  );
};

export default Login;
