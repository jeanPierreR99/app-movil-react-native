import { useContext, useEffect } from "react";
import DrawerNavigator from "./DrawerNavigation";
import StackNavigator from "./StackNavigator";
import { useLogin } from "./context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MainNavigator = () => {
  const {isLogin, setIsLogin} = useLogin()

  useEffect(()=>{
    const getUserStorage = async()=>{
      const user = await AsyncStorage.getItem("user");
      const objUser = JSON.parse(user);
  
      if(objUser){
        setIsLogin(true)
    }
  }
    getUserStorage()
  },[])

  return isLogin? <DrawerNavigator />: <StackNavigator />;
};

export default MainNavigator;
