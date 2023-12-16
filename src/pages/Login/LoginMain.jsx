import { useState, useRef } from "react";
import "./LoginMain.css";
import LoginNav from "./LoginNav";
import Login from "./Login";
import Register from "./Register";

import LoginUsingSocialMedia from "./LoginUsingSocialMedia";

export default function LoginMain() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <main className="login-register-container Page">
            <LoginNav isLogin={isLogin} setIsLogin={setIsLogin} />

            {isLogin ? <Login /> : <Register />}
        </main>
    );
}
