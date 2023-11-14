import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


function MenuNav({showMenu}) {
  const navigation = useNavigation();
  if (!showMenu) {
    return null;
  }
  return (
      <View style={styles.view}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')} style={styles.touch}
      >
           <Icon name="user" size={30} color="white" />
        <Text style={styles.text}>Mi cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Scaner')} style={styles.touch}
      >
        <View style={styles.scan}>
         <Icon name="qrcode" size={40} color="#e93373" />
         </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('History')} style={styles.touch}
      >
         <Icon name="history" size={30} color="white" />
        <Text style={styles.text}>Historial</Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize:20
  },
  touch:{
display:'flex',
flexDirection:'column',
alignItems:'center',
  },
  view:{
    display:'flex',
    flexDirection:'row',
    position:'absolute',
    bottom:20,
    height:70,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#e93373',
    width:'80%',
    alignSelf:'center',
    borderRadius:6
  },
scan:{
  borderWidth: 5,        
  borderColor: '#e93373',  
  borderStyle: 'solid',
  backgroundColor:'white',
  padding:17,
  borderRadius:50,
  position:'absolute',
  top:-60
}
})

export default MenuNav;


