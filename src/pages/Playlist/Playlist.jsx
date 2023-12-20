import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import BasicCard from "../../components/Card/BasicCard";
import { ArrowBack, Download } from "@mui/icons-material";
import { auth, db } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore";

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
            navigate("/notfound");
        }
    };
    const handleAddToLibrary = async () => {
        const newData = {
            title: playlistData?.name,
            cover: playlistData?.images[0]?.url,
            description: "",
            id: playlistData?.id,
            type: playlistData?.type,
            userId: auth.currentUser.uid,
        };
        try {
            const docRef = await addDoc(collection(db, "playlists"), newData);
        } catch (error) {
            console.log("Error Adding Album: ", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="Playlist Page">
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
                    onClick={handleAddToLibrary}
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
