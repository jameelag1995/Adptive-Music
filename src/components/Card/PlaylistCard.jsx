import { Paper, Typography } from "@mui/material";
import React from "react";

export default function PlaylistCard({ name, img }) {
    return (
        <Paper
            elevation={3}
            sx={{
                position:"relative",
                width: "40%",
                height: "300px",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                p: 2,
                background: `url(${img}) no-repeat center center/cover`,
            }}
        >
            <Typography variant="h5" color="white" sx={{position:"absolute",top:"10px",right:"10px",fontWeight:"600",textShadow:"0 0 5px black"}} >{name}</Typography>
        </Paper>
    );
}
