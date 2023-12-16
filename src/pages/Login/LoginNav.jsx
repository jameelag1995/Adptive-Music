import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function LoginNav({
    isLogin,
    setIsLogin,
    setForgotPassword,
    forgotPass,
}) {
    const navigate = useNavigate();
    return (
        <div className="top-buttons-container">
            <div className="login-register-btn">
                <Button
                    variant={
                        forgotPass
                            ? "outlined"
                            : isLogin
                            ? "contained"
                            : "outlined"
                    }
                    onClick={() => {
                        navigate("/auth/login");
                        setForgotPassword(false);
                        setIsLogin(true);
                    }}
                >
                    Log In
                </Button>
                <Button
                    variant={
                        forgotPass
                            ? "outlined"
                            : !isLogin
                            ? "contained"
                            : "outlined"
                    }
                    onClick={() => {
                        navigate("/auth/register");
                        setForgotPassword(false);
                        setIsLogin(false);
                    }}
                >
                    Register
                </Button>
            </div>
        </div>
    );
}
