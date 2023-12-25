import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext)

export default LoginProvider;
