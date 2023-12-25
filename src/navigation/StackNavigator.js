import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { ScreenLogin, ScreenRegister, ScreenMain } from "../constants";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS, // Animación de deslizamiento desde la derecha
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={ScreenMain}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={ScreenLogin}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={ScreenRegister}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
