import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalScanner = ({scan, data}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [register, setRegister] = useState(false)
  const [newData, setNewData] = useState({});
  const [activeButtons, setActiveButtons] = useState(false)

  const getData = ()=>{
  fetch(data)
  .then(response => response.json())
  .then(data => {
    if(data.user.account){
      console.log("succefull")
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
}, []);

  const okModal = ()=>{
    setRegister(true)
    setTimeout(()=>{
    setModalVisible(!modalVisible);
    scan(false);
    setRegister(false)
    // Alert.alert("su ingreso fue registrado")
  },2000)}
  
  const errorMOdal = ()=>{
    setModalVisible(!modalVisible);
    scan(false);
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contentCard}>
            <View style={styles.contentFlex}>
          <View>
    <Icon name="qrcode" size={40} color="#5c5d5f" />
    </View>
    <View>
    <Text style={styles.title}>LAB: {newData && newData.user && newData.user.lab && newData.user.lab.suneduCode}</Text>
    <View>
    <Text style={styles.textContent}>Evento: <Text style={styles.secondText}>{newData && newData.user && newData.user.lab && newData.user.lab.events[0].title }</Text></Text>
    </View>
    </View>
    </View>
    <Text style={styles.textContentB}>Responsable: <Text style={styles.secondText}>{newData && newData.user && newData.user.account && newData.user.account.firstName}{" "}{newData && newData.user && newData.user.account && newData.user.account.lastName}</Text></Text>
    </View>
    {
      activeButtons? <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={ okModal}>
      {register ? (
  <ActivityIndicator size="small" color="white" />
) : (
  <Text style={styles.textStyle}>Marcar Ingreso</Text>
)}
    </Pressable>: <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={ errorMOdal}>
  <Text style={styles.textStyle}>Cerrar</Text>
    </Pressable>
    }
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 22,
    fontWeight:'700',
    color:"#5c5d5f"
  },
  textContent:{
    fontSize:15,
    color:"#5c5d5f",
    fontWeight:'700',
  },
  secondText:{
    fontWeight:'400'
  },
  textContentB:{
    fontSize:15,
    color:"#5c5d5f",
    fontWeight:'700',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop:20,
    backgroundColor: '#e93373',
 width:200
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  contentFlex:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    borderBottomColor:'#e93373',
    borderBottomWidth:1,
    marginBottom:10,
    paddingBottom:10
  },
  contentCard:{
borderColor:'#e93373',
borderWidth:2,
padding:10
  }
});

export default ModalScanner;
