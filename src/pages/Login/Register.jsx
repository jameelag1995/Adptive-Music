import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginUsingSocialMedia from "./LoginUsingSocialMedia";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
function emailValidation(mailInput, setRegisterError) {
    const re = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // console.log(mailInput);
    if (!re.test(mailInput)) {
        setRegisterError("Invalid Email");
        return false;
    }
    setRegisterError("");
    return true;
}

// function emailExists(mailInput, data) {
//     // console.log(data);
//     const emailsArr = data.map((user) => user.email);
//     // console.log("emails Arr", emailsArr);
//     const alreadyExists = emailsArr.includes(mailInput);
//     // console.log("email already exists", alreadyExists);
//     if (alreadyExists) {
//         // setRegisterError("Email already Exists");
//         return false;
//     }
//     // setRegisterError("email does not exist");
//     return true;
// }
function passwordValidation(passInput, setRegisterError) {
    const re = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!re.test(passInput)) {
        setRegisterError(
            "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character."
        );
        return false;
    }
    setRegisterError("");
    return true;
}
function passwordConfirmation(mainPass, confirmPass, setRegisterError) {
    if (mainPass !== confirmPass) {
        setRegisterError("Passwords do not match");
        return false;
    }
    setRegisterError("");
    return true;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const { register } = useAuth();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (
            emailValidation(emailInput.current.value, setRegisterError) &&
            passwordConfirmation(
                passwordInput.current.value,
                confirmPasswordInput.current.value,
                setRegisterError
            ) &&
            passwordValidation(passwordInput.current.value, setRegisterError)
        ) {
            // setNewUser({...newUser,email:emailInput.current.value,password:passwordInput.current.value});
            try {
                setRegisterError("");
                setLoading(true);
                await register(
                    emailInput.current.value,
                    passwordInput.current.value
                );

                navigate("/dashboard");
            } catch (error) {
                setRegisterError("Failed to create an account");
            }
        }
        setLoading(false);
    };

    return (
        <div className="login-form-container">
            <Typography variant="h3">Create Account</Typography>
            <form id="login-form" onSubmit={handleRegisterSubmit}>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email"
                        label="Email"
                        inputRef={emailInput}
                        type="email"
                        size="large"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        label="Password"
                        size="large"
                        inputRef={passwordInput}
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
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-confirm-password"
                        label="Confirm Password"
                        size="large"
                        inputRef={confirmPasswordInput}
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
                </FormControl>
                <Button variant="contained" type="submit" disabled={loading}>
                    Register
                </Button>
                <LoginUsingSocialMedia />
            </form>
            {registerError && (
                <BasicModal msg={registerError} setMsg={setRegisterError} />
            )}
        </div>
    );
}
