import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import BasicCard from "../../components/Card/BasicCard";
import { Download } from "@mui/icons-material";

export default function Playlist() {
    const { accessToken } = useAuth();
    const { playlistId } = useParams();
    const [playlistData, setPlaylistData] = useState();

    const fetchData = async () => {
        const playlistParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        let playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;

        const playlistResult = await fetch(playlistUrl, playlistParams)
            .then((response) => response.json())
            .then((playlistResult) => {
                console.log(playlistResult);
                // const newData = Object.values(playlistResult)[0].items;
                // console.log(Object.values(playlistResult)[0].items);
                setPlaylistData(playlistResult);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="Playlist Page">
            <img
                src={playlistData?.images[0]?.url}
                alt="Playlist Cover"
                style={{ width: "300px", height: "300px" }}
            />

            <Typography variant="h3">{playlistData?.name}</Typography>
            <div
                className="buttons-container"
                style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "100%",
                    gap: "32px",
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    sx={{ color: "#fff" }}
                >
                    Download <Download />
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ color: "#fff" }}
                >
                    Add to Library
                </Button>
            </div>
            {playlistData?.tracks?.items?.map((item) => {
                return (
                    <BasicCard
                        key={item.track.id}
                        id={item.track.id}
                        cover={item.track?.album.images[1]?.url}
                        artist={item.track?.artists[0].name}
                        title={item.track?.name}
                        type={item.track?.type}
                        trackUrl={item.track?.uri}
                    />
                );
            })}
        </div>
    );
}
