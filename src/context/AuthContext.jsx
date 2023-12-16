import { createContext, useContext, useState } from "react";
import { auth } from "../Firebase";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ code: "", msg: "" });
    function register(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(
                    "Registration process succeeded, User:",
                    userCredential.user
                );
                setCurrUser(userCredential.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log("failed to register");
                setError({ ...error, code: err.code, msg: err.message });
            });
    }
    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(
                    "signed in successfully, User:",
                    userCredential.user
                );
                setCurrUser(userCredential.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log("failed to login");
                setError({ ...error, code: err.code, msg: err.message });
            });
    }
    function logout() {
        signOut(auth)
            .then(() => {
                console.log("logout successfully");
                setCurrUser(null);
                setLoading(true);
            })
            .catch((err) => {
                console.log("failed to logout");
                setError({ ...error, code: err.code, msg: err.message });
            });
    }

    const AuthContextValues = { currUser, login, logout, register };

    return (
        <AuthContext.Provider value={AuthContextValues}>
            {children}
        </AuthContext.Provider>
    );
}
