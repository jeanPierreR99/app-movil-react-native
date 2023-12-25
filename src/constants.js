import React from "react";
import Login from "./screens/login/Login";
import Main from "./screens/main/Main";
import Register from "./screens/register/Register";
import Profile from "./screens/profile/Profile";
import QRCodeScanner from "./screens/scanner/Permission";
import History from "./screens/history/History";


export const ScreenMain = () => <Main />;
export const ScreenLogin = () => <Login />;
export const ScreenRegister = () => <Register />;
export const ScreenProfile = () => <Profile />;
export const ScreenScanner = () => <QRCodeScanner />;
export const ScreenHistory = () => <History />;

export const menuItems = [
  {
    name: "Perfil",
    navigationName: "Profile",
    iconName: "user",
  },
  {
    name: "Camara",
    navigationName: "Scanner",
    iconName: "qrcode",
  },
  {
    name: "Historial",
    navigationName: "History",
    iconName: "history",
  },
];

