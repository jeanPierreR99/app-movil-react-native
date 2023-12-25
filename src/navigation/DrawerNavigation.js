import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ScreenLogin,
  ScreenHistory,
  ScreenRegister,
  ScreenScanner,
  ScreenMain,
  ScreenProfile,
} from "../constants";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Profile" component={ScreenProfile} />
      <Drawer.Screen name="Scanner" component={ScreenScanner} />
      <Drawer.Screen name="History" component={ScreenHistory} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
