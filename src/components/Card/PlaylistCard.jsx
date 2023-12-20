import { Paper, Slide, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ name, img, id, description = "" }) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log(id);
        navigate(`/playlist/${id}`);
    };
    return (
        <Slide in direction="up" style={{ transitionDuration: 600 }}>
            <Paper
                onClick={handleClick}
                elevation={3}
                sx={{
                    position: "relative",
                    width: "40%",
                    height: "200px",
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                    p: 2,
                    background: `url(${img}) no-repeat center center/cover`,
                }}
            >
                <Typography
                    variant="h5"
                    color="white"
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        fontWeight: "600",
                        textShadow: "0 0 5px black",
                        zIndex:3
                    }}
                >
                    {name}
                </Typography>
            </Paper>
        </Slide>
    );
}
