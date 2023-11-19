import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuNav from '../menu/MenuNav';

const Item = ({suneduCode, title, fecha}) => (
  <View style={styles.item}>
    <View>
    <Icon name="qrcode" size={40} color="black" />
    </View>
    <View style={styles.w}>
    <Text style={styles.title}>Laboratorio: {suneduCode}</Text>
    <Text style={styles.title}>Titulo: {title}</Text>
    <View style={styles.flexDate}>
    <Text style={styles.textF}>Fecha:</Text>
    <Text style={styles.text} numberOfLines={2} >{fecha}</Text>
    </View>
    </View>
  </View>
);

const History = () => {
const [newData, setNewData] = useState([]);
const [user, setUser] = useState("");
const [loader, setLoader] = useState(true)

const getUserStorage = async () => {
  const user = await AsyncStorage.getItem('user');
  const objUser = JSON.parse(user);
  setUser(objUser)
};

const fetchData = async () => {
  const url = `https://cenun-api-render.onrender.com/api/attendance/all/visitor/${user.id}?lab=true&event=true$session=true`
  const token = user.access_token

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    setNewData(data); 
    setLoader(false)
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    setLoader(false)
  }
};

useEffect(() => {
  getUserStorage()
}, []);

useEffect(() => {
  fetchData()
}, [fetchData]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTop}>Historial de asistencias</Text>
       <ImageBackground
      source={require('../../assets/borrar2.png')}
      style={styles.containerback}
    />
    {loader? <ActivityIndicator size="x-large" color="gray" />:
      <FlatList
      style={styles.list}
        data={newData}
        renderItem={({item}) => <Item suneduCode={item.lab.suneduCode} title={item.event.title} fecha={item.dateRecord.createdAt} />}
        keyExtractor={item => item.dateRecord.createdAt}
      />}
         <MenuNav showMenu={true}/>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:70
  },
  list:{
width:'100%',
alignSelf:'center',
paddingLeft:20,
paddingRight:20
  },
  containerback: {
    flex: 1,
    resizeMode: 'cover',
    opacity:.4,
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  w:{
width:'80%'
  },
  item: {
    alignItems:'center',
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    display:'flex',
    flexDirection:'row',
    gap:10,
    backgroundColor:'white',
    borderRadius:6,
    borderWidth: 2,        
    borderColor: '#e93373',  
    borderStyle: 'solid',
    width:'100%'
  },
  title: {
    fontSize: 18,
    fontWeight:'700'
  },
  titleTop: {
    fontSize: 25,
    fontWeight:'600',
    padding: 20
  },
  text:{
fontSize:17,
maxWidth: '80%',
  },
  textF:{
    fontSize:17,
      },
  flexDate:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
  }
});

export default History;