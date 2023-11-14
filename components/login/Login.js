import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCredentials = async (username, password) => {
  try {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
  } catch (error) {
    console.error('Error al guardar las credenciales:', error);
  }
};

const Login = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false); 

    const loginClick = ()=>{
        if(code == "17121015" && password == '1234'){
        setLoading(true);
        saveCredentials(code, password)
        setTimeout(() => {
          navigation.navigate('Profile')
    
          setLoading(false);
        }, 2000); 
        }
        else{
            Alert.alert("contraseña incorrecta")
        }
    }

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
        <TextInput
          style={styles.inputText}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
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
        {' '} <Text style={styles.registerText}>Registrarse
            </Text>
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
  logo: {
    resizeMode: 'cover',
    width:220,
    height:220,
    alignSelf:'center',
    top:20
  },
  text:{
    fontSize:15,
    marginBottom:7
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
