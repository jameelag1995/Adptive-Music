import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
const client_id = import.meta.env.VITE_SPOTIFY_clientId;
const client_secret = import.meta.env.VITE_SPOTIFY_clientSecret;
const url = "https://accounts.spotify.com/api/token";
const AuthContext = createContext({
    currentUser: {},
    login: () => {},
    logout: () => {},
    register: () => {},
    resetPassword: () => {},
    accessToken: "",
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    useEffect(() => {
        
        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                client_id +
                "&client_secret=" +
                client_secret,
        };
        // GET ACCESS TOKEN
        fetch(url, authParameters)
            .then((result) => result.json())
            .then((data) => setAccessToken(data.access_token));
    }, []);

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout() {
        return signOut(auth);
    }
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const AuthContextValues = {
        currentUser,
        login,
        logout,
        register,
        resetPassword,
        accessToken,
    };

    return (
        <AuthContext.Provider value={AuthContextValues}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
