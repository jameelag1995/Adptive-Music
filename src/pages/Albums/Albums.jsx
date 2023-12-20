import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Slide, Typography } from "@mui/material";
import BasicCard from "../../components/Card/BasicCard";
import { ArrowBack, Download } from "@mui/icons-material";
import NotFound from "../NotFound/NotFound";
import { auth, db } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore";
export default function Albums() {
    const { accessToken } = useAuth();
    const { albumId } = useParams();
    const [albumData, setAlbumData] = useState();
    const navigate = useNavigate();
    const fetchData = async () => {
        const albumParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        let albumUrl = `https://api.spotify.com/v1/albums/${albumId}`;
        try {
            const response = await fetch(albumUrl, albumParams);
            if (!response.ok) {
                throw new Error("fetch failed");
            }
            const result = await response.json();
            setAlbumData(result);
        } catch (err) {
            console.log(err.message);
            navigate("/notfound");
        }
    };
    const handleAddToLibrary = async () => {
        const newData = {
            title: albumData?.name,
            cover: albumData?.images[0]?.url,
            description: "",
            id: albumData?.id,
            type: albumData.type,
            userId: auth.currentUser.uid,
        };
        try {
            const docRef = await addDoc(collection(db, "playlists"), newData);
        } catch (error) {
            console.log("Error Adding Playlist: ", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Slide in direction="up" style={{ transitionDuration: 600 }}>
            <div className="Albums Page">
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
                    src={albumData?.images[0]?.url}
                    alt="Album Cover"
                    style={{ width: "300px", height: "300px" }}
                />

                <Typography variant="h3" sx={{ textShadow: "0 0 4px" }}>
                    {albumData?.name}
                </Typography>
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
                        <Download />
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ color: "#fff" }}
                        onClick={handleAddToLibrary}
                    >
                        Add to Library
                    </Button>
                </div>
                {albumData?.tracks?.items?.map((item) => {
                    return (
                        <BasicCard
                            key={item.id}
                            id={item.id}
                            cover={albumData.images[0].url}
                            artist={item.artists[0].name}
                            title={item.name}
                            type={item.type}
                            trackUrl={item.uri}
                        />
                    );
                })}
            </div>
        </Slide>
    );
}
