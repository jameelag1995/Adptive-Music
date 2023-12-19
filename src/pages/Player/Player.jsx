import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, Typography } from "@mui/material";
import "./Player.css";
import {
    AddToPhotos,
    ArrowBack,
    Equalizer,
    FastForward,
    FastRewind,
    HorizontalRule,
    PauseCircle,
    PlayCircle,
    Share,
    Speaker,
    Tune,
} from "@mui/icons-material";
export default function Player() {
    const { trackId } = useParams();
    const [trackData, setTrackData] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const { accessToken, currentUser } = useAuth();
    const navigate = useNavigate();
    const fetchData = async () => {
        const trackParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        let trackUrl = `https://api.spotify.com/v1/tracks/${trackId}`;

        try {
            const response = await fetch(trackUrl, trackParams);
            if (!response.ok) throw new Error("fetch failed ");
            const result = await response.json();
            console.log(result);
            setTrackData(result);
        } catch (error) {
            console.log(error.message);
            navigate("/notfound");
        }
    };
    console.log(currentUser);
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Slide in style={{transitionDuration: 600 }} direction="up" mountOnEnter unmountOnExit>
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
            <div className="Player Page">
                <img
                    src={trackData?.album.images[0].url}
                    alt="track cover"
                    style={{
                        width: "400px",
                        height: "400px",
                        borderRadius: "6px",
                    }}
                />
                <div className="track-info">
                    <Typography
                        variant="h4"
                        sx={{ textAlign: "left", width: 1 }}
                    >
                        {trackData?.name}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "left", width: 1 }}
                        color="grey"
                    >
                        {trackData?.artists?.length > 1
                            ? trackData?.artists?.map((artist, index) => {
                                  return index > 0
                                      ? `, ${artist.name}`
                                      : `${artist.name}`;
                              })
                            : trackData?.artists?.map((artist) => artist.name)}
                    </Typography>
                </div>
                <div className="extra-buttons">
                    <Tune sx={{ width: "40px", height: "40px" }} />{" "}
                    <AddToPhotos sx={{ width: "40px", height: "40px" }} />
                </div>
                {/* track timeline */}
                <div className="player-buttons">
                    <FastRewind sx={{ width: "64px", height: "64px" }} />
                    {isPlaying ? (
                        <PauseCircle
                            sx={{ width: "64px", height: "64px" }}
                            onClick={() => setIsPlaying(false)}
                        />
                    ) : (
                        <PlayCircle
                            sx={{ width: "64px", height: "64px" }}
                            onClick={() => setIsPlaying(true)}
                        />
                    )}
                    <FastForward sx={{ width: "64px", height: "64px" }} />
                </div>
                <div className="bottom-buttons">
                    <div className="playing-on">
                        <Speaker sx={{ width: "32px", height: "32px" }} />
                        <Typography variant="h7" sx={{ textAlign: "left" }}>
                            {currentUser.displayName}{" "}
                        </Typography>
                    </div>
                    <Share />
                </div>
            </div>
        </Slide>
    );
}
