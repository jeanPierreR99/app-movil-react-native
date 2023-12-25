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
import { ValidateEmail } from "../../validateEmail";
import { useLogin } from "../../navigation/context/LoginProvider";

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
  const initSplit = firstName.split("")[0]
  const obj = {
    id,
    career,
    dni,
    email,
    firstName,
    lastName,
    phone,
    access_token,
    initial: initSplit
  };
  const objJSON = JSON.stringify(obj);
  await AsyncStorage.setItem("user", objJSON);
  console.log("Objeto guardado correctamente");
};

const url = "https://cenun-api-render.onrender.com/api/auth/login/visitor";

const Login = () => {
  const {setIsLogin} = useLogin()
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const postLogin = async (code_, password_) => {
    try {
      let data ="";
      if(ValidateEmail(code_)){
        data = {
          email: code_,
          password: password_,
        };
      }
      else{
        data = {
          username: code_,
          password: password_,
        };
      }
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
          setIsLogin(true)
        } else {
          console.log("no succefull");
        }
      })
      .catch(() => {
        console.log("no succefull");
      });
  };

  const loginClick = async () => {
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
      <View className="w-[80%] self-center  items-center ">
        <ImageBackground
          source={require("../../../assets/logo.png")}
          className="w-[220px] h-[220px] self-center mt-[20px]"
        />
        <View className="w-full p-[10px]">
          <View>
            <View className="absolute z-[1] left-2 top-[5px]">
              <Icon name="user" size={30} color="green" opacity={0.4} />
            </View>
            <TextInput
              className="h-[40px] bg-green-100 rounded-md text-[16px] pl-10 text-gray-500"
              placeholder="Email o código de estudiante"
              onChangeText={(text) => setCode(text)}
            />
          </View>
        </View>
        <View className="w-full p-[10px]">
          <View className="relative">
            <View className="absolute z-[1] left-2 top-[5px]">
              <Icon name="lock" size={30} color="green" opacity={0.4} />
            </View>
            <TextInput
              className="h-[40px] bg-green-100 rounded-md text-[16px] pl-10 text-green-500"
              placeholder="Ingrese su contraseña"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-2 top-[5px]"
            >
              {showPassword ? (
                <Icon name="eye-slash" size={30} color="green" opacity={0.8} />
              ) : (
                <Icon name="eye" size={30} color="green" opacity={0.4} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={loginClick}
          className="w-full bg-green-500 h-[40px] rounded-md items-center justify-center my-[20px] "
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="color-white text-xl">Iniciar sesión</Text>
          )}
        </TouchableOpacity>
        <View className="mb-[20px] w-[90%] items-center">
          <Text className="text-[15px] font-bold mb-[7px] text-gray-600">
            ¿Todavia no tienes una cuenta?.{" "}
            <Text className="text-green-500" onPress={registerClick}>
              Registrarse
            </Text>
          </Text>
        </View>
      </View>
      {/* <ImageBackground
        source={require("../../../assets/borrar2.png")}
        className="flex-1 absolute w-full h-full opacity-40"
      /> */}
    </View>
  );
};

export default Login;
