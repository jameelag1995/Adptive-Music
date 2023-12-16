import { Button, Typography, useTheme } from "@mui/material";
import Equalizer from "../../components/Equalizer/Equalizer";
import darkLogo from "../../assets/images/applogo.png";
import lightLogo from "../../assets/images/lightapplogo.png";
import "./Welcome.css";
import { Link } from "react-router-dom";
export default function Welcome() {
    const { palette } = useTheme();
    return (
        <div className="Welcome Page">
            {palette.mode === "dark" ? (
                <img src={darkLogo} alt="app logo" />
            ) : (
                <img src={lightLogo} alt="app logo" />
            )}
            <main>
                <Typography variant="h5" color="primary">
                    Listen to your favorite music the way you like it!
                </Typography>
                <Link to="/auth/">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ p: 2, fontWeight: 600 }}
                    >
                        Get Started
                    </Button>
                </Link>
            </main>
            <div className="equalizers">
                <Equalizer />
                <Equalizer />
                <Equalizer />
            </div>
        </div>
    );
}
