import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
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

urlPost = "https://cenun-api-render.onrender.com/api/auth/register/visitor";
const Register = () => {
  const {setIsLogin} = useLogin()
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firtsName, setFirtsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [carrera, setCarrera] = useState("");

  const getData = (code) => {
    const url = `https://cenun-api-render.onrender.com/api/data/student/${code}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {
          console.log("succefull");
          setUser(data[0]);
          const nameSplit = data[0].fullName.split(",");
          setFirtsName(nameSplit[1]);
          setLastName(nameSplit[0]);
          setDni(data[0].dni);
          setEmail(data[0].email);
          setTel(data[0].phoneNumber);
          setCarrera(data[0].carrerName);
          setLoading(false);
        } else {
          console.log("no succefull");
          setLoading(false);
        }
      })
      .catch(() => {
        console.log("no succefull");
        setLoading(false);
      });
  };

  const postRegister = async () => {
    try {
      const data = {
        account: {
          dni: dni,
          email: email,
          username: code,
          password: password,
          firstName: firtsName,
          lastName: lastName,
          phone: tel,
        },
        type: "STUDENT",
        studentCode: code,
        university: "UNIVERSIDAD NACIONAL AMAZÓNICA DE MADRE DE DIOS",
        career: carrera,
        eventIds: [1],
      };

      const response = await fetch(urlPost, {
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

  const registerClick = async () => {
    console.log("click");
    if (code != "" && password != "" && email != "" && ValidateEmail(email)) {
      setLoading(true);
      const log = await postRegister();

      if (log) {
        if (log.visitor) {
          saveUserStorage(
            log.visitor.id,
            log.visitor.career,
            log.visitor.account.dni,
            log.visitor.account.email,
            log.visitor.account.firstName,
            log.visitor.account.lastName,
            log.visitor.account.phone,
            log.access_token
          );
          Alert.alert("usuario registrado");
          setIsLogin(true)
        } else {
          Alert.alert("ocurrio un error");
        }
      } else {
        Alert.alert("credenciales incorrectas");
      }
    } else {
      Alert.alert("Rellene los campos");
    }
  };

  loginClick = () => {
    navigation.navigate("Login");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validPassword = (text) => {
    if (text.length >= 8) {
      setPassword(text);
    } else {
      setPassword("");
    }
  };
  return (
    <View className="flex-1 justify-center bg-white">
      <View className="w-[80%] self-center items-center z-[1]">
        <Text className="text-2xl font-bold text-green-500 mb-4">
          Registrar Nueva Cuenta
        </Text>
        <View className="w-full p-[5px]">
          <View className="relative">
            <TextInput
              className="h-[40px] bg-green-100 rounded-md text-[18px] p-[7px] text-green-600"
              placeholder="codigo de estudiante"
              keyboardType="numeric"
              onChangeText={(text) => {
                if (text.length == 8) {
                  setLoading(true);
                  getData(text);
                  setCode(text);
                }
              }}
              maxLength={8}
            />
            {loading ? (
              <ActivityIndicator
                className="absolute right-[10px] top-[10px]"
                size="small"
                color="gray"
              />
            ) : (
              ""
            )}
          </View>
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">
            Nombres
          </Text>
          <TextInput
            className="h-[40px] bg-gray-100 rounded-md text-[18px] p-[7px] text-[#5c5d5f]"
            placeholderTextColor="#003f5c"
            value={firtsName || ""}
            onChangeText={(text) => setFirtsName(text)}
            editable={false}
          />
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">
            Apellidos
          </Text>
          <TextInput
            className="h-[40px] bg-gray-100 rounded-md text-[18px] p-[7px] text-[#5c5d5f]"
            placeholderTextColor="#003f5c"
            value={lastName || ""}
            editable={false}
          />
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">DNI</Text>
          <TextInput
            className="h-[40px] bg-gray-100 rounded-md text-[18px] p-[7px] text-[#5c5d5f]"
            placeholderTextColor="#003f5c"
            value={user.dni || ""}
            editable={false}
          />
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">
            Email
          </Text>
          <TextInput
            className={`h-[40px] rounded-md text-[18px] p-[7px] text-[#5c5d5f] ${
              user.email !== null ? "bg-gray-100" : "bg-green-100"
            }`}
            placeholderTextColor="#003f5c"
            value={user.email}
            editable={user.email ? false : true}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">
            Telefono
          </Text>
          <TextInput
            className="h-[40px] bg-gray-100 rounded-md text-[18px] p-[7px] text-[#5c5d5f]"
            placeholderTextColor="#003f5c"
            value={51 + user.phoneNumber || ""}
            editable={false}
          />
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">
            Usuario
          </Text>
          <TextInput
            value={user.userName || ""}
            className="h-[40px] bg-gray-100 rounded-md text-[18px] p-[7px] text-[#5c5d5f]"
            editable={false}
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View className="w-full p-[5px]">
          <Text className="text-[15px] mb-2 font-bold text-gray-600">
            Contraseña
          </Text>
          <View className="relative">
            <TextInput
              className="h-[40px] bg-green-100 rounded-md text-[18px] p-[7px] text-green-500"
              onChangeText={(text) => validPassword(text)}
              minLength={8}
              secureTextEntry={!showPassword}
              placeholder="mas de 8 caracteres"
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-[10px] top-[5px]"
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
          onPress={registerClick}
          className="w-full bg-green-500 h-[40px] rounded-md items-center justify-center my-[20px] "
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="color-white text-xl">Registrarse</Text>
          )}
        </TouchableOpacity>
        <View className="mb-[20px] w-[90%] items-center">
          <Text className="text-[15px] font-bold mb-[7px] text-gray-600">
            ya tienes una cuenta.{" "}
            <Text className="text-green-500" onPress={loginClick}>
              Ingresar
            </Text>
          </Text>
        </View>
      </View>
      {/* <Image
          source={require("../../../assets/borrar2.png")}
          className="flex-1 absolute w-full h-full opacity-40"
        /> */}
    </View>
  );
};

export default Register;
