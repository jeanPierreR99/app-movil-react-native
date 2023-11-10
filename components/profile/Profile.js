import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuNav from '../menu/MenuNav';
function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
    <Text>menu profilssssssse</Text>
    <MenuNav showMenu={true}/>
    </View>
  );
}
const styles = StyleSheet.create({
  view:{
    width:'100%',
    height:'100%',
  },
})
export default Profile;
