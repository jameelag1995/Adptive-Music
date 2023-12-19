import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Library() {
    const navigate = useNavigate();
    return (
        <div className="Library Page">
            <ArrowBack
                sx={{
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    left: "8px",
                    top: "8px",
                }}
                onClick={()=>navigate(-1)}
            />
        </div>
    );
}
