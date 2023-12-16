import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
const AuthContext = createContext({
    currentUser: {},
    login: () => {},
    logout: () => {},
    register: () => {},
    resetPassword: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

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
    };

    return (
        <AuthContext.Provider value={AuthContextValues}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
