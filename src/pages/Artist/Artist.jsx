import { Avatar, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import BasicCard from "../../components/Card/BasicCard";

export default function Artist() {
    const { accessToken } = useAuth();
    const { artistId } = useParams();
    const [artistData, setArtistData] = useState();
    const [artistAlbums, setArtistAlbums] = useState();
    const navigate = useNavigate();

    const fetchData = async () => {
        const artistParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        let artistUrl = "https://api.spotify.com/v1/artists/" + artistId;

        try {
            const response = await fetch(artistUrl, artistParams);
            if (!response.ok) throw new Error("fetch failed");
            const result = await response.json();
            setArtistData(result);
        } catch (error) {
            console.log(error.message);
            navigate("/notfound");
        }

        let artistAlbumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
        try {
            const response = await fetch(artistAlbumsUrl, artistParams);
            if (!response.ok) throw new Error("fetching albums failed");
            const result = await response.json();
            setArtistAlbums(result.items);
        } catch (error) {
            console.log(error.message);
            navigate("/notfound");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="Artist Page">
            <Avatar
                sx={{ width: "80px", height: "80px" }}
                src={artistData?.images[1].url}
            ></Avatar>
            <Typography variant="h3">{artistData?.name}</Typography>

            <Typography variant="h6">
                Followers: {artistData?.followers.total}
            </Typography>
            <Button variant="contained" color="success" sx={{ color: "#fff" }}>
                Follow
            </Button>
            {artistAlbums?.map((album) => {
                return (
                    <BasicCard
                        key={album.id}
                        cover={album?.images[1]?.url}
                        artist={album?.artists[0].name}
                        title={album?.name}
                        type={album?.type}
                        albumUrl={album?.uri}
                    />
                );
            })}
        </div>
    );
}
