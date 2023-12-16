import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import LoginUsingSocialMedia from "./LoginUsingSocialMedia";
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

function emailExists(mailInput, data) {
    // console.log(data);
    const emailsArr = data.map((user) => user.email);
    // console.log("emails Arr", emailsArr);
    const alreadyExists = emailsArr.includes(mailInput);
    // console.log("email already exists", alreadyExists);
    if (alreadyExists) {
        // setRegisterError("Email already Exists");
        return false;
    }
    // setRegisterError("email does not exist");
    return true;
}
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
    const url = "https://6566fd1464fcff8d730f82fe.mockapi.io/users";
    const [usersData, setUsersData] = useState([]);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        phoneNum: "",
        address: "",
        img: "",
    });
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();
    const navigate = useNavigate();
    const [invalidInput, setInvalidInput] = useState(false);
    const [registerError, setRegisterError] = useState("");
    // console.log(registerError);
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (
            emailInput.current.value === "" ||
            passwordInput.current.value === "" ||
            confirmPasswordInput.current.value === ""
        ) {
            setRegisterError("Must fill all fields!");
            return;
        }

        if (
            !emailExists(emailInput.current.value, usersData, setRegisterError)
        ) {
            setRegisterError("Email already exists");
            // console.log(registerError);
            return;
        }

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
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...newUser,
                        email: emailInput.current.value,
                        password: passwordInput.current.value,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Response Error ${response.status}`);
                }
                const result = await response.json();
                // console.log([...usersData, result])
                setUsersData([...usersData, result]);
                // console.log(result)
                emailInput.current.value = "";
                passwordInput.current.value = "";
                confirmPasswordInput.current.value = "";
                sessionStorage.setItem("user", JSON.stringify(result));
                navigate("/dashboard");
            } catch (error) {
                console.log("Error", error);
            }
        }

        // console.log(registerError);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch user data ${response.status}`
                    );
                }
                const result = await response.json();
                setUsersData(result);
                // console.log(usersData);
            } catch (error) {
                console.log("Error fetching user data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="register-form-container">
            <h1>Create Account</h1>
            <form id="register-form" onSubmit={handleRegisterSubmit}>
                <div className="input-container">
                    <CiMail className="icon" />
                    <input
                        ref={emailInput}
                        type="email"
                        name="useremail"
                        id="email-input"
                        placeholder="Email"
                    />
                </div>
                <div className="input-container">
                    <RiLockPasswordLine
                        className="icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                    />

                    <input
                        ref={passwordInput}
                        type={!showPassword ? "password" : "text"}
                        name="userpassword"
                        id="password-input"
                        placeholder="Password"
                    />
                </div>
                <div className="input-container">
                    <RiLockPasswordLine
                        className="icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                    />

                    <input
                        ref={confirmPasswordInput}
                        type={!showPassword ? "password" : "text"}
                        name="confirmuserpassword"
                        id="confirm-password-input"
                        placeholder="Confirm Password"
                    />
                </div>
                <input type="submit" value="Register" />
                <LoginUsingSocialMedia />
                {registerError ? (
                    <p className="error-msg">{registerError}</p>
                ) : (
                    <p></p>
                )}
            </form>
        </div>
    );
}
