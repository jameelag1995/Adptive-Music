import { useState } from "react";
import { useTheme } from "@mui/material";
import "./LoginMain.css";
import LoginNav from "./LoginNav";
import Login from "./Login";
import Register from "./Register";
import darkLogo from "../../assets/images/applogo.png";
import lightLogo from "../../assets/images/lightapplogo.png";
import ForgotPassword from "./ForgotPassword";

export default function LoginMain() {
    const { palette } = useTheme();
    const [isLogin, setIsLogin] = useState(true);
    const [forgotPass, setForgotPass] = useState(false);
    return (
        <main className="login-register-container Page">
            <LoginNav
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setForgotPassword={setForgotPass}
                forgotPass={forgotPass}
            />
            {forgotPass ? (
                <ForgotPassword />
            ) : isLogin ? (
                <Login setForgotPassword={setForgotPass} />
            ) : (
                <Register />
            )}

            {palette.mode === "dark" ? (
                <img src={darkLogo} alt="app logo" />
            ) : (
                <img src={lightLogo} alt="app logo" />
            )}
        </main>
    );
}
