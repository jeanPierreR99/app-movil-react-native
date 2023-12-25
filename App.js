import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/mainNavigator";
import LoginProvider from "./src/navigation/context/LoginProvider";

const App = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator></MainNavigator>
      </NavigationContainer>
    </LoginProvider>
  );
};

export default App;
