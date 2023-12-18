import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import GetToken from "./Search";
import "./Dashboard.css";
import Search from "./Search";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
export default function Dashboard() {
    const { currentUser } = useAuth();
    console.log(currentUser);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState();
    useEffect(() => {
        if (!currentUser) navigate("/auth/login");
    }, []);
    return (
        <div className="Dashboard Page">
            {/* <Link to="/auth/login">
                <Button variant="outlined" color="error" onClick={logout}>
                    Logout
                </Button>
            </Link> */}

            <Search />
            <BottomNavBar />
        </div>
    );
}
