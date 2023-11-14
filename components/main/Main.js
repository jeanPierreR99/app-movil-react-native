import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
;
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuNav from '../menu/MenuNav';

function Main() {
    const navigation = useNavigation();

  return (
      <View style={styles.content}>
        <View style={styles.contentImage}>
          <ImageBackground
      source={require('../../assets/logo.png')}
      style={styles.backImage}
    />
    </View>
     <Text style={styles.text}>Servicio de asistencia digital de los centros universitarios de conectividad.</Text>
     <TouchableOpacity
        onPress={() => navigation.navigate('Login')} style={styles.touch}
      >
         <Text style={styles.textB}>Empecemos</Text>
         <Icon name="arrow-right" size={30} color="white" />
      </TouchableOpacity>
      <MenuNav showMenu={false}/>
      </View>
  );
}

const styles = StyleSheet.create({
 content:{
    width:'100%',
    height:'100%',
    backgroundColor:'white'
 },
 contentImage:{
  marginTop:70,
  width:'100%',
  height:'50%',
  alignSelf:'center'
 },
 backImage: {
    resizeMode: 'cover',
    width:'100%',
    height:'100%',
  },
  text:{
    width:'70%',
    fontSize:16,
    textAlign:'center',
    alignSelf:'center'
  },
  textB:{
color:'white',
fontSize:20
  },
  touch: {
    marginTop:60,
    padding:10,
    borderRadius:7,
    display:'flex',
    flexDirection:'row',
    backgroundColor: '#e93373',
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
  },
  
})

export default Main;


