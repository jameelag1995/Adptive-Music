import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateCurrentUser,
    updateProfile,
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
    update: () => {},
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
    const navigate = useNavigate();
    function update(newDisplayName) {
        console.log(auth.currentUser);
        return updateProfile(auth.currentUser, {
            displayName: newDisplayName,
        })
            .then(() => setCurrentUser(auth.currentUser))
            .catch((err) => console.log("error updating user"));
    }
    function register(email, password, displayName) {
        return createUserWithEmailAndPassword(auth, email, password).then(
            (userCredentials) => {
                updateProfile(userCredentials, {
                    displayName: displayName,
                });
                // userCredentials.user.displayName = displayName;
                // window.localStorage.setItem("displayName", displayName);
            }
        );
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout() {
        window.localStorage.clear();
        navigate("/auth/login");
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
        update,
        accessToken,
    };

    return (
        <AuthContext.Provider value={AuthContextValues}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
