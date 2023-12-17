import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function Dashboard() {
    const { currentUser } = useAuth();
    console.log(currentUser);
    const navigate = useNavigate();
    const { logout } = useAuth();
    useEffect(() => {
        if (!currentUser) navigate("/auth/login");

        
    }, []);
    return (
        <div>
            Dashboard
            <Link to="/auth/login">
                <Button variant="outlined" color="warning" onClick={logout}>
                    Logout
                </Button>
            </Link>
        </div>
    );
}
