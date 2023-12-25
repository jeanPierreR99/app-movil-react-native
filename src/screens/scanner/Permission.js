import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import DrawerHeader from "../../navigation/DrawerHeader";
import ModalScanner from "./ModalScanner";

function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
  };

  if (hasPermission === null) {
    return <Text>Iniciando escaner...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View className="flex-1 pt-[20px]">
      <DrawerHeader></DrawerHeader>
      <View className="flex-[1] flex-col flex-end mt-4">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          className="relative">
     <View className="w-1 h-20 bg-green-400 absolute top-[160px] left-[30px]"></View>
     <View className="w-20 h-1 bg-green-400 absolute top-[160px] left-[30px]"></View>
     <View className="w-1 h-20 bg-green-400 absolute top-[160px] right-[30px]"></View>
     <View className="w-20 h-1 bg-green-400 absolute top-[160px] right-[30px]"></View>

     <View className="w-1 h-20 bg-green-400 absolute bottom-[160px] left-[30px]"></View>
     <View className="w-20 h-1 bg-green-400 absolute bottom-[160px] left-[30px]"></View>
     <View className="w-1 h-20 bg-green-400 absolute bottom-[160px] right-[30px]"></View>
     <View className="w-20 h-1 bg-green-400 absolute bottom-[160px] right-[30px]"></View>
          </BarCodeScanner>
        {scanned && <ModalScanner scan={setScanned} data={data}></ModalScanner>}
      </View>
    </View>
  );
}

export default QRCodeScanner;
