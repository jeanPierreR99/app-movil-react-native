import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuNav from '../menu/MenuNav';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    idLab: 'SL01LA2S2',
    fecha: '24 sep 2023, 9:30 am'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    idLab: 'SL01LA2S2',
    fecha: '24 sep 2023, 9:30 am'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    idLab: 'SL01LA2S2',
    fecha: '24 sep 2023, 9:30 am'
  },
  
];

const Item = ({idLab, fecha}) => (
  <View style={styles.item}>
    <View>
    <Icon name="qrcode" size={40} color="black" />
    </View>
    <View style={styles.w}>
    <Text style={styles.title}>Laboratoriosss {idLab}</Text>
    <View style={styles.flexDate}>
    <Text style={styles.text}>Fecha</Text>
    <Text style={styles.text}>{fecha}</Text>
    </View>
    </View>
  </View>
);

const History = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTop}>Historial de asistencias</Text>
       <ImageBackground
      source={require('../../assets/borrar2.png')}
      style={styles.containerback}
    />
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item idLab={item.idLab} fecha={item.fecha} />}
        keyExtractor={item => item.id}
      />
         <MenuNav showMenu={true}/>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerback: {
    flex: 1,
    resizeMode: 'cover',
    opacity:.4,
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  item: {
    alignItems:'center',
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    display:'flex',
    flexDirection:'row',
    gap:10,
    backgroundColor:'white',
    borderRadius:6,
    borderWidth: 2,        
    borderColor: '#e93373',  
    borderStyle: 'solid',
  },
  title: {
    fontSize: 22,
    fontWeight:'700'
  },
  titleTop: {
    fontSize: 25,
    fontWeight:'600',
    padding: 20
  },
  text:{
fontSize:17
  },
  flexDate:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    gap:120
  }
});

export default History;