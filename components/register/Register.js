import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

const saveUserStorage = async (id, email, access_token) => {

  const obj = {
    id,
    email,
    access_token
  };
    const objJSON = JSON.stringify(obj);
    await AsyncStorage.setItem('user', objJSON);
    console.log('Objeto guardado correctamente');

};

urlPost = "https://cenun-api-render.onrender.com/api/visitor"
const Register = () => {


    const [user, setUser] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);
    const [firtsName, setFirtsName] = useState("")
    const [lastName, setLastName] = useState("")
    const [code, setCode] = useState("")
    const [dni, setDni] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [carrera, setCarrera] = useState("")

    const getData = (code)=>{
        const url = `https://cenun-api-render.onrender.com/api/data/student/${code}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data[0]){
            console.log("succefull")
            console.log(data)
            setUser(data[0])
            const nameSplit = data[0].fullName.split(",")
            setFirtsName(nameSplit[1])
            setLastName(nameSplit[0])
            setDni(data[0].dni)
            setEmail(data[0].email)
            setTel(data[0].phoneNumber)
            setCarrera(data[0].carrerName)
            setLoading(false)
          }
          else{
            console.log("no succefull")
            setLoading(false)
          }
        })
        .catch(() => {
          console.log("no succefull")
          setLoading(false)
        })
      }

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
              phone: tel
            },
            type: "STUDENT",
            studentCode: code,
            university: "stringst",
            career: carrera,
            eventIds: [
              1
            ]
          }
      
          const response = await fetch(urlPost, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const res = await response.json();
          console.log(data)
          setLoading(false);
          return res;
        } catch (error) {
          console.error('Error en la solicitud:', error);
          throw error;
        }
      };

    const registerClick = async()=>{
      console.log("click")
        if(code!= ""  && password !=""){
        setLoading(true);
        const log = await postRegister()
        
        if(log){
        //   saveUserStorage(log.visitor.id, log.visitor.account.email, log.access_token)
        //   navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Profile' }],
        //   });
        console.log("asdasd")
        Alert.alert("usaurio registrado")
        console.log(log)
        }
        else{
          Alert.alert("credenciales incorrectas")
        }
        }
        else{
            Alert.alert("Rellene los campos")
        }
    }

    loginClick = ()=>{
        navigation.navigate('Login')
      }

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };


    const validPassword = (text) => {
      if (text.length >= 8) {
        setPassword(text);
      }
      else{
        setPassword("");
      }
    };
  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.card}>
      <View style={styles.inputView}>
      <Text style={styles.text}>Código de estudiante</Text>
      <View style={{position:'relative'}}>
      <TextInput
          style={styles.inputTextEdit}
          placeholderTextColor="#003f5c"
          keyboardType="numeric"
          onChangeText={(text) => {if(text.length == 8){
            setLoading(true)
            getData(text)
            setCode(text)
          }}}
          maxLength={8}
        />
            {loading? <ActivityIndicator style={styles.loadCode} size="small" color="gray" />: ""
            }
     
          </View>
      </View>
       <View style={styles.inputView}>
      <Text style={styles.text}>Nombres</Text>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          value={firtsName || ""}
          onChangeText={(text)=>setFirtsName(text)}
          editable ={false}
        />
      </View>
      <View style={styles.inputView}>
      <Text style={styles.text}>Apellidos</Text>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          value={lastName || ""}
          editable ={false}
        />
      </View>
      <View style={styles.inputView}>
      <Text style={styles.text}>DNI</Text>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          value={user.dni || ""}
          editable ={false}
        />
      </View>
      <View style={styles.inputView}>
      <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          value={user.email || ""}
          editable ={false}
        />
      </View>
      <View style={styles.inputView}>
      <Text style={styles.text}>Telefono</Text>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          value={51+user.phoneNumber || ""}
          editable ={false}
        />
      </View>
      <View style={styles.inputView}>
      <Text style={styles.text}>Usuario</Text>
        <TextInput
        value={user.userName || ""}
          style={styles.inputText}
          editable={false}
          placeholderTextColor="#003f5c"
          onChangeText={(text)=>setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}>Contraseña</Text>
        <View style={{position:'relative'}}>
        <TextInput
          style={styles.inputTextEdit}
          placeholderTextColor="#003f5c"
          onChangeText={(text)=>validPassword(text)}
          minLength={8}
          secureTextEntry={!showPassword}
          placeholder='mas de 8 caracteres'
        
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyes}>    
              {showPassword ?  <Icon name="eye-slash" size={30} color="#e93373" opacity={.8} /> :  <Icon name="eye" size={30} color="#e93373" opacity={.5} />}
          </TouchableOpacity>
          </View>
      </View>
      <TouchableOpacity onPress={registerClick} style={styles.loginBtn} disabled={loading} >
      {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
            <Text style={styles.loginText}>Registrarse</Text>
        )}
      </TouchableOpacity>
        <View style={styles.register}>
        <Text style={styles.text}>ya tienes una cuenta.
        {' '}<Text style={styles.registerText} onPress={loginClick}>Ingresar</Text>
      </Text>
      </View>
      </View>
      <Image
      source={require('../../assets/borrar2.png')}
      style={styles.containerback}
    />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:40,
    paddingBottom:40,
    flex: 1,
    backgroundColor: 'white',
    display:'flex',
    justifyContent:'center',
  },
  loadCode:{
    position:'absolute',
    right: 10,
    top:10
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
 
    width:'80%',
    alignSelf:'center',
    alignItems:'center',
    zIndex:1,
    display:'flex',
    flexDirection:'column',
    
  },
  inputView: {
    width: '100%',
    padding: 5,
   
  },
  inputText: {
    padding:7,
    height: 40,
    fontSize:18,
    color: '#5c5d5f',
    backgroundColor:'#ebebeb',
    borderColor:'#e93373',
    borderWidth:1,
    borderRadius:7,
    elevation: 8,
    shadowColor: '#000',
  },
  inputTextEdit: {
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
    resizeMode: 'stretch',
    opacity:.4,
    position:'absolute',
    width:'100%',
    height:'100%'
  },
});

export default Register;
