import { Avatar, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import BasicCard from "../../components/Card/BasicCard";

export default function Artist() {
    const { accessToken } = useAuth();
    const { artistId } = useParams();
    const [artistData, setArtistData] = useState();
    const [artistAlbums, setArtistAlbums] = useState();

    const fetchData = async () => {
        const artistParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        let artistUrl = "https://api.spotify.com/v1/artists/" + artistId;

        const artistResult = await fetch(artistUrl, artistParams)
            .then((response) => response.json())
            .then((artistResult) => {
                console.log(artistResult);
                // const newData = Object.values(artistResult)[0].items;
                // console.log(Object.values(artistResult)[0].items);
                setArtistData(artistResult);
            });

        let artistAlbumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;

        const artistAlbumsResult = await fetch(artistAlbumsUrl, artistParams)
            .then((response) => response.json())
            .then((artistResult) => {
                console.log(artistResult?.items);
                // const newData = Object.values(artistResult)[0].items;
                // console.log(Object.values(artistResult)[0].items);
                setArtistAlbums(artistResult.items);
            });
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
