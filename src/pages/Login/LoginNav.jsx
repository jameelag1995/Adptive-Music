import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function LoginNav({ isLogin, setIsLogin }) {
    // const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="top-buttons-container">
            <div className="login-register-btn">
                <button
                    id="login-btn"
                    className={`btn ${isLogin ? "active" : "inactive"}`}
                    onClick={() => {
                        navigate("/auth/login");
                        setIsLogin((prev) => !prev);
                    }}
                >
                    Login
                </button>
                <button
                    id="register-btn"
                    className={`btn ${!isLogin ? "active" : "inactive"}`}
                    onClick={() => {
                        navigate("/auth/register");
                        setIsLogin((prev) => !prev);
                    }}
                >
                    Register
                </button>
            </div>
        </div>
    );
}
