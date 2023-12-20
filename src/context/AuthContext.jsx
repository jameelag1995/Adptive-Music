import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
        return updateProfile(auth.currentUser, {
            displayName: newDisplayName,
        })
            .then(() => setCurrentUser(auth.currentUser))
            .catch((err) => console.log("error updating user"));
    }
    async function addUserToDataBase(newUser) {
        try {
            const docRef = await addDoc(collection(db, "users"), newUser);

            setCurrentUser(newUser);
        } catch (error) {
            console.error("Error adding user to database: ", error);
        }
    }
    async function register(email, password, displayName) {
        return createUserWithEmailAndPassword(auth, email, password).then(
            (userCredentials) => {
                updateProfile(auth.currentUser, {
                    displayName: displayName,
                })
                    .then(() => {
                        setCurrentUser(auth.currentUser);
                        const newUser = {
                            displayName: auth.currentUser.displayName,
                            email: auth.currentUser.email,
                            userId: auth.currentUser.uid,
                            library: {
                                playlists: [],
                                albums: [],
                                likedSongs: [],
                            },
                        };
                        addUserToDataBase(newUser);
                    })
                    .catch((err) => console.log("error registering user"));
            }
        );
        // userCredentials.user.displayName = displayName;
        // window.localStorage.setItem("displayName", displayName);
    }
    async function getUserFromDatabase(loggedUserId) {
        const querySnapshot = await getDocs(collection(db, "users"));
        const newData = [];
        querySnapshot.forEach((doc) => {
            newData.push(doc.data());
        });

        const loggedUser = newData.find((user) => user.userId === loggedUserId);

        setCurrentUser(loggedUser);
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                getUserFromDatabase(userCredentials.user.uid);
            })
            .catch((error) => {
                console.log("failed to login", error.message);
            });
    }
    function logout() {
        window.localStorage.clear();
        navigate("/auth/");
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
