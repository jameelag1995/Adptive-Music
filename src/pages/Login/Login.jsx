import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginUsingSocialMedia from "./LoginUsingSocialMedia";
import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const url = "https://6566fd1464fcff8d730f82fe.mockapi.io/users";
    const [usersData, setUsersData] = useState([]);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [invalidInput, setInvalidInput] = useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.current.value && password.current.value) {
            setInvalidInput("");
            const emailexist = usersData.find(
                (user) => user.email === email.current.value
            );
            if (emailexist === undefined) {
                setInvalidInput("Incorrect Email or Password");
                return;
            }
            console.log(emailexist);
            const passwordCorrect =
                emailexist.password === password.current.value;
            console.log(emailexist, passwordCorrect);
            if (emailexist && passwordCorrect) {
                console.log("emailexist && passwordCorrect");
                // save id from emailexist object (retrieved user object) to session
                sessionStorage.setItem("user", JSON.stringify(emailexist));
                navigate("/dashboard");
            }
            // console.log("invalid input", invalidInput);
            setInvalidInput("Incorrect Password");
            return;
        }
        setInvalidInput("Incorrect Email or Password");
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setUsersData(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="login-form-container">
            <Typography variant="h3">Welcome Back</Typography>

            <form id="login-form" onSubmit={handleSubmit}>
                <OutlinedInput
                    variant="outlined"
                    placeholder="Email"
                    ref={email}
                    type="email"
                    
                    size="large"
                    fullWidth={true}
                />

                <OutlinedInput
                fullWidth={true}
                    placeholder="Password"
                    size="large"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <div className="forgt-password-container">
                    <a className="forgot-password" href="">
                        Forgot your password?
                    </a>
                </div>
                <input type="submit" value="Login" />
                <LoginUsingSocialMedia />
                {invalidInput ? (
                    <p className="error-msg">{invalidInput}</p>
                ) : (
                    <p></p>
                )}
            </form>
        </div>
    );
}
