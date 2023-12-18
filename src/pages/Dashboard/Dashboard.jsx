import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import GetToken from "./Search";
import "./Dashboard.css";
import Search from "./Search";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import PlaylistCard from "../../components/Card/PlaylistCard";
const client_id = import.meta.env.VITE_SPOTIFY_clientId;
const client_secret = import.meta.env.VITE_SPOTIFY_clientSecret;
const url = "https://accounts.spotify.com/api/token";
export default function Dashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState();
    const [playlists, setPlaylists] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    useEffect(() => {
        if (!currentUser) return navigate("/auth/login");
        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                client_id +
                "&client_secret=" +
                client_secret,
        };
        // GET ACCESS TOKEN
        fetch(url, authParameters)
            .then((result) => result.json())
            .then((data) => setAccessToken(data.access_token));
    }, []);
    useEffect(() => {
        if (!accessToken) {
            return;
        }
        // get request using search to get the artist id
        const fetchParams = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };

        // setTimeout(async () => {
        //     let genreUrl =
        //         "https://api.spotify.com/v1/recommendations/available-genre-seeds";
        //     try {
        //         const genreResult = await fetch(genreUrl, fetchParams);
        //         if (!genreResult.ok) {
        //             throw new Error("failed fetching data");
        //         }
        //         genreResult
        //             .then((response) => response.json())
        //             .then((genre) => {
        //                 // console.log(genre);
        //                 const newData = Object.values(genre)[0];
        //                 console.log(newData);
        //                 setData(newData);
        //                 return genre;
        //             });
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }, 2000);

        setTimeout(async () => {
            let playlistsUrl =
                "https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=8";
            const playlistsResult = await fetch(playlistsUrl, fetchParams)
                .then((response) => response.json())
                .then((playlists) => {
                    console.log(playlists.playlists.items);
                    // const newData = Object.values(playlists)[0];
                    // console.log("playlists",newData);
                    setPlaylists(playlists.playlists.items);
                    return playlists;
                });
        }, 600);
    }, [accessToken]);

    return (
        <div className="Dashboard Page">
            {/* <Link to="/auth/login">
                <Button variant="outlined" color="error" onClick={logout}>
                    Logout
                </Button>
            </Link> */}

            <Search accessToken={accessToken} setIsSearching={setIsSearching} />
            {!isSearching && (
                <div className="genre-container">
                    {playlists?.map((playlist) => {
                        return (
                            <PlaylistCard
                                key={playlist.id}
                                img={playlist.images[0].url}
                                name={playlist.name}
                            />
                        );
                    })}
                    {data?.map((genre, index) => {
                        return (
                            <Paper
                                sx={{
                                    width: "30%",
                                    height: "100px",
                                    display: "grid",
                                    placeItems: "center",
                                    textAlign: "center",
                                    p: 2,
                                }}
                                key={index}
                                elevation={3}
                            >
                                {genre}
                            </Paper>
                        );
                    })}
                </div>
            )}
            <BottomNavBar />
        </div>
    );
}
