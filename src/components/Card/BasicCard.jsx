import { Album, MusicNote, Person, QueueMusic } from "@mui/icons-material";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grow,
    Slide,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BasicCard({
    title,
    artist,
    cover,
    type,
    trackUrl,
    id,
}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/${type}/${id}`);
    }

    return (
        <Slide in direction="up" style={{ transitionDuration: 600 }}>
            <Card
                onClick={handleClick}
                sx={{
                    width: 1,
                    height: "100px",
                    borderRadius: 6,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    zIndex: "999",
                    gap: "16px",
                }}
            >
                <CardMedia
                    component="img"
                    sx={{ width: "100px", height: "100px" }}
                    image={cover}
                    alt={`${title} cover`}
                />
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        gap: "8px",
                        width: "calc(100% - 100px)",
                    }}
                >
                    {type === "track" ? (
                        <MusicNote />
                    ) : type === "album" ? (
                        <Album />
                    ) : type === "artist" ? (
                        <Person />
                    ) : (
                        <QueueMusic />
                    )}
                    <Typography
                        noWrap
                        sx={{
                            minWidth: "45%",
                        }}
                    >
                        {title}
                    </Typography>
                    <Divider
                        sx={{ height: 50, m: 0.5 }}
                        orientation="vertical"
                    />
                    <Typography sx={{ minWidth: "45%" }}>{artist}</Typography>
                </CardContent>
            </Card>
        </Slide>
    );
}
