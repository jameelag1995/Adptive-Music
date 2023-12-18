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
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/events" element={<Events />} />
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
