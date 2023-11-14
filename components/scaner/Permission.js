import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalScanner from './ModalScanner';
import MenuNav from '../menu/MenuNav';
function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data)
  };

  if (hasPermission === null) {
    return <Text>Escaneando...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.viewDB}>
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <ModalScanner scan={setScanned} data={data}></ModalScanner>
      )}
    </View>
    <MenuNav showMenu={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  viewDB:{
width:'100%',
height:'100%'
  },
  scanText: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 10,
  },
});

export default QRCodeScanner;
