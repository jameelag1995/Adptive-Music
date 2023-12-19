import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import BasicCard from "../../components/Card/BasicCard";
import { Download } from "@mui/icons-material";

export default function Playlist() {
    const { accessToken } = useAuth();
    const { playlistId } = useParams();
    const [playlistData, setPlaylistData] = useState();
    const navigate = useNavigate();
    const fetchData = async () => {
        const playlistParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        let playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;

        try {
            const response = await fetch(playlistUrl, playlistParams);
            if (!response.ok) throw new Error("fetch failed");
            const result = await response.json();
            setPlaylistData(result);
        } catch (error) {
            console.log(error.message);
            navigate('/notfound');
        }
        // const playlistResult = await fetch(playlistUrl, playlistParams)
        //     .then((response) => {
        //         if (!response.ok) throw new Error("fetch failed");

        //         return response.json();
        //     })
        //     .then((playlistResult) => {
        //         console.log(playlistResult);
        //         // const newData = Object.values(playlistResult)[0].items;
        //         // console.log(Object.values(playlistResult)[0].items);
        //         setPlaylistData(playlistResult);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //         navigate("/notfound");
        //     });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="Playlist Page">
            <img
                src={playlistData?.images[0].url}
                alt="Playlist Cover"
                style={{ width: "300px", height: "300px" }}
            />

            <Typography variant="h3">{playlistData?.name}</Typography>
            <div
                className="buttons-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
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
