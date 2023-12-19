import { ArrowBack, Error } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="NotFound Page">
            <ArrowBack
                sx={{
                    width: "40px",
                    height: "40px",
                    position: "absolute",
                    left: "8px",
                    top: "8px",
                }}
                onClick={() => navigate(-1)}
            />
            <Typography variant="h3">Page Not Found</Typography>
            <Error sx={{ width: "96px", height: "96px" }} />
        </div>
    );
}
