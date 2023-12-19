import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./pages/Welcome/Welcome";
import { deepPurple, orange } from "@mui/material/colors";
import { ThemeSwitch } from "./components/ThemeSwitch/ThemeSwitch";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router";
import LoginMain from "./pages/Login/LoginMain";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/Login/ForgotPassword";
import Events from "./pages/Events/Events";
import Profile from "./pages/Profile/Profile";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import Library from "./pages/Library/Library";
import Artist from "./pages/Artist/Artist";
import Playlist from "./pages/Playlist/Playlist";
import Albums from "./pages/Albums/Albums";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    const [modeColor, setModeColor] = useState("dark");
    const theme = createTheme({
        palette: {
            mode: modeColor,
            primary: modeColor === "dark" ? orange : deepPurple,
        },
    });
    const handleChange = () => {
        setModeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeSwitch theme={theme} onChange={handleChange} />
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Welcome />} />
                    <Route path="/auth" element={<LoginMain />}>
                        <Route path="/auth/login" element={<Login />} />
                        <Route
                            path="/auth/forgotPassword"
                            element={<ForgotPassword />}
                        />
                        <Route path="/auth/register" element={<Register />} />
                    </Route>
                    <Route
                        path="/dashboard"
                        element={
                            <>
                                <Dashboard />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <>
                                <Events />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <Profile />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <>
                                <Library />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="/artist/:artistId"
                        element={
                            <>
                                <Artist />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="/playlist/:playlistId"
                        element={
                            <>
                                <Playlist />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="/album/:albumId"
                        element={
                            <>
                                <Albums />
                                <BottomNavBar />
                            </>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <>
                                <NotFound />
                                <BottomNavBar />
                            </>
                        }
                    />
                </Routes>

                {/* <h1>Welcome To My App</h1>
                    <Button
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                    >
                    contained button
                    </Button>
                  <BasicModal /> */}
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
