import { Album, MusicNote, Person, QueueMusic } from "@mui/icons-material";
import {
    Card,
    CardContent,
    CardMedia,
    Divider,
    Typography,
} from "@mui/material";
import React from "react";

export default function BasicCard({ title, artist, cover, type, trackUrl }) {
    return (
        <Card
            sx={{
                width: 1,
                borderRadius: 6,
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
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
                    justifyContent: "space-between",
                    gap: "8px",
                    width: "100%-100px",
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
                <Divider sx={{ height: 50, m: 0.5 }} orientation="vertical" />
                <Typography  sx={{minWidth:'45%'}}>{artist}</Typography>
            </CardContent>
        </Card>
    );
}
