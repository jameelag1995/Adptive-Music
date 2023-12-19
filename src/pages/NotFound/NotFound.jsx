import { Error } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import "./NotFound.css"
export default function NotFound() {
    return (
        <div className="NotFound Page">
            <Typography variant="h3">Page Not Found</Typography>
            <Error sx={{ width: "96px", height: "96px" }} />
        </div>
    );
}
