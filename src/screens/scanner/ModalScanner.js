import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalScanner = ({scan, data}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [register, setRegister] = useState(false)
  const [newData, setNewData] = useState({});
  const [activeButtons, setActiveButtons] = useState(false)
  const [user, setUser] = useState("");
  const [fecthData, setFecthData] = useState("")

  const getUserStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    const objUser = JSON.parse(user);
    setUser(objUser)
  };

  const getData = ()=>{
  fetch(data)
  .then(response => response.json())
  .then(data => {
    if(data.user.account){
      console.log("succefull")
      console.log(data)
      setNewData(data)
      setModalVisible(true)
      setActiveButtons(true)
    }
    else{
      console.log("no succefull")
      setModalVisible(true)
      setActiveButtons(false)
    }
  })
  .catch(() => {
    console.log("no succefull")
    setModalVisible(true)
    setActiveButtons(false)
  })
}

useEffect(() => {
  getData()
  getUserStorage()
}, []);


  const postAttendance = async ()=>{
      const url = `https://cenun-api-render.onrender.com/api/attendance`
      const token = user.access_token
    
      const dataFecht = {
        "visitorId": user.id,
        "labId": newData.user.lab.id,
        "eventId": newData.user.lab.events[0].id,
        "sessionId": newData.id
      }
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dataFecht),
        });
    
        const data = await response.json();
        // setFecthData(data)
        console.log(data)
        setModalVisible(!modalVisible);
        scan(false);
        setRegister(false)
        Alert.alert("su registro fue exitoso")
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setModalVisible(!modalVisible);
        scan(false);
        setRegister(false)
        Alert.alert("ocurrio un error al registrarse")
      }

  }

  const okModal = async ()=>{
    setRegister(true)
    postAttendance()
  }
  
  const errorMOdal = ()=>{
    setModalVisible(!modalVisible);
    scan(false);
  }
  return (
    <View className="flex-1 justify-center items-center mt-[22px]">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View className="flex-1 justify-center items-center mt-[22px]">
          <View className="mt-[20px] bg-white rounded-lg p-[35px] items-center ">
            <View className="border-2 border-green-400 p-[10px] self-center">
            <View className="flex flex-row border-b border-green-400 mb-[10px] pb-[10px]">
          <View className="mr-2">
    <Icon name="qrcode" size={40} color="#5c5d5f" />
    </View>
    <View>
    <Text className="text-xl font-bold text-[#5c5d5f]">LAB: {newData && newData.user && newData.user.lab && newData.user.lab.suneduCode}</Text>
    <View>
    <Text className="text-md font-bold text-[#5c5d5f]">Evento: <Text className="font-bold">{newData && newData.user && newData.user.lab && newData.user.lab.events[0].title }</Text></Text>
    </View>
    </View>
    </View>
    <Text className="text-md font-bold text-[#5c5d5f]">Responsable: <Text className="font-bold">{newData && newData.user && newData.user.account && newData.user.account.firstName}{" "}{newData && newData.user && newData.user.account && newData.user.account.lastName}</Text></Text>
    </View>
    {
      activeButtons? <Pressable
      className="rounded-md p-[10px] mt-[20px] w-[200px] bg-green-400"
      onPress={ okModal}>
      {register ? (
  <ActivityIndicator size="small" color="white" />
) : (
  <Text className="text-white font-bold text-center">Marcar Ingreso</Text>
)}
    </Pressable>: <Pressable
      className="rounded-md p-[10px] mt-[20px] w-[200px] bg-green-400"
      onPress={ errorMOdal}>
  <Text className="text-white font-bold text-center">Cerrar</Text>
    </Pressable>
    }
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentFlex:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    borderBottomColor:'#e93373',
    borderBottomWidth:1,
    marginBottom:10,
    paddingBottom:10
  },
});

export default ModalScanner;
