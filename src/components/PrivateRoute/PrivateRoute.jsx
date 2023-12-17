import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// export default function PrivateRoute({children }) {
//     const navigate = useNavigate();
//     const { currentUser } = useAuth();
//     // if (!currentUser) navigate("/auth/login");
//     // useEffect(() => {
//     //     if (!currentUser) navigate("/auth/login");
//     // }, [currentUser]);
//     return currentUser ? <>{children}</> : <>{navigate("/auth/login")}</>;
// }
import {useEffect, useState } from "react";
import { RTMSession } from "../../services/RTMSession";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";

const PrivateRoute = ({ component }) => {
    const navigate = useNavigate();
    const [isAuthorized] = useState(!!RTMSession.token);
    useEffect(() => {
        if (!isAuthorized) {
            navigate('/login');
        }
    }, [])
    return <>
    {isAuthorized ? component : <CircularProgress color="secondary" />}
    </>;
};

export default PrivateRoute