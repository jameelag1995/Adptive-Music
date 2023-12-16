// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function PrivateRoute({ children }) {
//     const navigate = useNavigate();
//     const { currentUser } = useAuth();
//     // if (!currentUser) navigate("/auth/login");
//     // useEffect(() => {
//     //     if (!currentUser) navigate("/auth/login");
//     // }, [currentUser]);
//     return currentUser ? <>{children}</> : <>{navigate("/auth/login")}</>;
// }
