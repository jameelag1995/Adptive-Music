import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Avatar, Button, Paper, TextField, Typography } from "@mui/material";
import PlaylistCard from "../../components/Card/PlaylistCard";
import "../Dashboard/Dashboard.css";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Profile() {
    const navigate = useNavigate();
    const { accessToken, currentUser, logout, update } = useAuth();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [userData, setUserData] = useState([]);
    const newDisplayNameRef = useRef();

    function displayNameToLetters() {
        if (!currentUser?.displayName) return;
        let name = currentUser?.displayName;
        const namesArr = name.split(" ");
        let initials = namesArr.map((name) => `${name[0]}`).join(" ");
        return initials.toUpperCase();
    }
    function handleClick() {
        if (isEditingProfile === false) setIsEditingProfile(true);
        else {
            if (newDisplayNameRef.current.value === "") {
                setIsEditingProfile(false);
                return;
            } else {
                currentUser.displayName = newDisplayNameRef.current.value;
                update(newDisplayNameRef.current.value);
                setIsEditingProfile(false);
            }
        }
    }
    const [playlists, setPlaylists] = useState();

    useEffect(() => {
        if (!currentUser) return navigate("/auth/login");
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

        const fetchData = async () => {
            let playlistsUrl =
                "https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=16";
            const playlistsResult = await fetch(playlistsUrl, fetchParams)
                .then((response) => response.json())
                .then((playlists) => {
                    setPlaylists(playlists.playlists.items.splice(8));
                    return playlists;
                });
        };
        fetchData();
    }, [accessToken]);

    const nameFromLocal = window.localStorage.getItem("displayName");
    return (
        <div className="Profile Page">
            <Button
                variant="contained"
                color="error"
                sx={{ position: "absolute", top: "8px", left: "8px" }}
                onClick={logout}
            >
                Logout
            </Button>
            <Avatar sx={{ width: "64px", height: "64px" }}>
                {currentUser?.displayName && displayNameToLetters()}
            </Avatar>
            <Typography variant="h4">
                {currentUser?.displayName
                    && currentUser?.displayName}
            </Typography>
            <Button variant="contained" fullWidth onClick={handleClick}>
                {isEditingProfile ? "Update Profile" : "Edit Profile"}
            </Button>
            {isEditingProfile && (
                <Paper sx={{ width: 1 }}>
                    <TextField
                        inputRef={newDisplayNameRef}
                        id="outlined-basic"
                        label="New Display Name"
                        variant="outlined"
                        fullWidth
                    />

                    {/* <TextField label="New Display Name" variant="Outlined" /> */}
                </Paper>
            )}
            <div className="genre-container">
                {playlists?.map((playlist) => {
                    return (
                        <PlaylistCard
                            key={playlist.id}
                            id={playlist.id}
                            type={playlist.type}
                            img={playlist.images[0].url}
                            name={""}
                        />
                    );
                })}
                {/* {data?.map((genre, index) => {
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
                    })} */}
            </div>
        </div>
    );
}
