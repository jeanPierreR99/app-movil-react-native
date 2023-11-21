import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const saveUserStorage = async (id, career, dni ,email, firstName, lastName, phone, access_token) => {
  const obj = {
    id,
    career,
    dni,
    email,
    firstName,
    lastName,
    phone,
    access_token
  };
    const objJSON = JSON.stringify(obj);
    await AsyncStorage.setItem('user', objJSON);
    console.log('Objeto guardado correctamente');
};

const url = "https://cenun-api-render.onrender.com/api/auth/login/visitor"

const Login = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false); 
    const [loginUser, setLoginUser] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const postLogin = async (code_, password_) => {
      try {
        const data = {
          email: code_,
          password: password_,
        };
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        setLoading(false);
        return res;
      } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
      }
    };

    const getAccount = (id, token)=>{
      urlAccount = `https://cenun-api-render.onrender.com/api/visitor/${id}?events=true&attendances=true`;

      fetch(urlAccount, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
  .then(response => response.json())
  .then(data => {
    if(data.studentCode){
      console.log("succefull")
      saveUserStorage(data.id, data.career, data.account.dni, data.account.email, data.account.firstName, data.account.lastName, data.account.phone, token)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      });
    }
    else{
      console.log("no succefull")
    }
  })
  .catch(() => {
    console.log("no succefull")
  })
    }

    const loginClick = async()=>{
      console.log("click")
        if(code!= "" && password !=""){
        setLoading(true);
        const log = await postLogin(code,password)
        
        if(log && log.visitor){
          getAccount(log.visitor.id, log.access_token)
        }
        else{
          Alert.alert("credenciales incorrectas")
        }
        }
        else{
            Alert.alert("Rellene los campos")
        }
    }

      registerClick = ()=>{
        navigation.navigate('Register')
      }

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

  return (
    <View style={styles.container}>
        <View style={styles.card}>
        <ImageBackground
      source={require('../../assets/logo.png')}
      style={styles.logo}
    />
      <View style={styles.inputView}>
      <Text style={styles.text}>Usuario</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Código de estudiante"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setCode(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}>Contraseña</Text>
        <View style={{position:'relative'}}>
        <TextInput
          style={styles.inputText}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#003f5c"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyes}>    
              {showPassword ?  <Icon name="eye-slash" size={30} color="#e93373" opacity={.8} /> :  <Icon name="eye" size={30} color="#e93373" opacity={.5} />}
          </TouchableOpacity>
          </View>
      </View>
      <TouchableOpacity onPress={loginClick} style={styles.loginBtn} disabled={loading} >
      {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
            <Text style={styles.loginText}>Iniciar sesion</Text>
        )}
      </TouchableOpacity>
        <View style={styles.register}>
        <Text style={styles.text}>¿Todavia no tienesuna cuenta?.
        {' '}<Text style={styles.registerText} onPress={registerClick}>Registrarse</Text>
      </Text>
      </View>
      </View>
      <ImageBackground
      source={require('../../assets/borrar2.png')}
      style={styles.containerback}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display:'flex',
    justifyContent:'center',
  },
  eyes:{
position:'absolute',
right: 10,
top:5
  },
  logo: {
    resizeMode: 'cover',
    width:220,
    height:220,
    alignSelf:'center',
    top:20
  },
  text:{
    fontSize:15,
    marginBottom:7,
    fontWeight:'700'
  },
  card:{
    borderTopWidth:4,
    borderBottomWidth:4,
    borderTopColor:'#e93373',
    borderBottomColor:'#e93373',
    width:'80%',
    alignSelf:'center',
    alignItems:'center',
    zIndex:1,
    display:'flex',
    flexDirection:'column',
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 7,
    backgroundColor:'white'
  },
  inputView: {
    width: '80%',
    padding: 10,
  },
  inputText: {
    padding:7,
    height: 40,
    fontSize:18,
    color: '#5c5d5f',
    backgroundColor:'white',
    borderColor:'#e93373',
    borderWidth:1,
    borderRadius:7,
    elevation: 8,
    shadowColor: '#000',
  },
  register: {
   marginBottom:20,
   width:'90%',
   alignItems:'center',
  },
  registerText:{
color:'#e93373',
fontSize:15,
fontWeight:'700'

  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#e93373',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
    fontSize:20
  },
  containerback: {
    flex: 1,
    resizeMode: 'cover',
    opacity:.4,
    position:'absolute',
    width:'100%',
    height:'100%'
  },
});

export default Login;
