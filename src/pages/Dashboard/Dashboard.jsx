import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import GetToken from "../../components/Search/Search";
import "./Dashboard.css";
import Search from "../../components/Search/Search";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import PlaylistCard from "../../components/Card/PlaylistCard";
import Equalizer from "../../components/Equalizer/Equalizer";
import BasicCard from "../../components/Card/BasicCard";
import TestCard from "../../components/Card/TestCard";

export default function Dashboard() {
    const { currentUser, logout, accessToken } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [isSearching, setIsSearching] = useState(false);
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

        setTimeout(async () => {
            let playlistsUrl =
                "https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=8";
            const playlistsResult = await fetch(playlistsUrl, fetchParams)
                .then((response) => response.json())
                .then((playlists) => {
                    setPlaylists(playlists.playlists.items);
                    return playlists;
                });
        }, 1000);
    }, [accessToken]);

    return (
        <div className="Dashboard Page">

            <Search accessToken={accessToken} setIsSearching={setIsSearching} />
            {!isSearching && (
                <div className="genre-container">
                    <TestCard
                        artist="Ed Sheeran"
                        title="Shape of you"
                        cover="https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png/220px-Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png"
                        id={1}
                        type="R&B, Pop, Dancehall"
                        trackUrl="../../assets/tracks/Ed_Sheeran_Shape_of_You.mp3"
                    />
                    <TestCard
                        artist="Aram"
                        title="Burn It"
                        cover="https://img.freepik.com/free-vector/realistic-music-record-label-disk-mockup_1017-33906.jpg?w=996&t=st=1703059752~exp=1703060352~hmac=70b611b3b050b073a552131335af67fc32f97d3481f009eeb816dbb12a643b04"
                        id={2}
                        type="Beat"
                        trackUrl="../../assets/tracks/burnit.wav"
                    />
                    {playlists?.map((playlist) => {
                        return (
                            <PlaylistCard
                                key={playlist.id}
                                id={playlist.id}
                                img={playlist.images[0].url}
                                name={playlist.name}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
