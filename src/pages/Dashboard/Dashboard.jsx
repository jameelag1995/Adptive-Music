import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const { currentUser } = useAuth();
    console.log(currentUser);
    
    return <div>Dashboard</div>;
}
