import { Add, ArrowBack, Close } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase";
import {
    setDoc,
    doc,
    updateDoc,
    Firestore,
    query,
    collection,
    where,
    getDoc,
    getDocs,
    addDoc,
} from "firebase/firestore";
import "./Library.css";
import {
    Button,
    FormControl,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import PlaylistCard from "../../components/Card/PlaylistCard";
import ImageUploadCard from "../Events/ImageUploadCard";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { useAuth } from "../../context/AuthContext";
export default function Library() {
    const navigate = useNavigate();
    const titleRef = useRef();
    const coverRef = useRef();
    const descriptionRef = useRef();
    const { currentUser } = useAuth();
    const [addingPlaylist, setAddingPlaylist] = useState(false);
    const [playlistsData, setPlaylistsData] = useState([]);
    const handleAddPlaylist = () => {
        setAddingPlaylist(true);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newData = {
            title: titleRef.current.value,
            cover: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1660&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: descriptionRef.current.value,
            userId: auth.currentUser.uid,
            id: 1,
            type: "myplaylist",
        };
        setPlaylistsData([...playlistsData, newData]);
        setAddingPlaylist(false);
        try {
            const docRef = await addDoc(collection(db, "playlists"), newData);
        } catch (error) {
            console.log("Error Adding Playlist: ", error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "playlists"));
            const newData = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().userId === auth.currentUser.uid)
                    newData.push(doc.data());
            });

            setPlaylistsData(newData);
        };
        fetchData();
    }, []);

    return (
        <div className="Library Page">
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
            <div
                className="add-playlist"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    marginTop: "16px",
                }}
            >
                <Typography variant="h4">Library</Typography>
                <Add
                    onClick={handleAddPlaylist}
                    sx={{ width: "40px", height: "40px" }}
                />
            </div>
            <div className="playlistsContainer">
                {playlistsData?.length === 0 ? (
                    <Typography variant="h3">No Playlists</Typography>
                ) : (
                    playlistsData?.map((event, index) => {
                        return (
                            <PlaylistCard
                                key={index}
                                name={event.title}
                                img={event.cover}
                                description={event.description}
                                id={event.id}
                                type={event.type}
                            />
                        );
                    })
                )}
            </div>

            {addingPlaylist && (
                <Paper
                    sx={{
                        zIndex: 3,
                        width: "100%",
                        maxWidth: "600px",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        p: "48px 16px",
                    }}
                >
                    <Close
                        onClick={() => setAddingPlaylist(false)}
                        sx={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                        }}
                    />
                    <FormControl
                        sx={{
                            width: 1,
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <Typography variant="h3">Playlist Details</Typography>
                        <TextField
                            inputRef={titleRef}
                            id="outlined-multiline-flexible"
                            label="Title"
                            multiline
                            maxRows={4}
                            fullWidth
                        />

                        <TextField
                            inputRef={descriptionRef}
                            id="outlined-multiline-flexible"
                            label="Event Description"
                            multiline
                            maxRows={4}
                            fullWidth
                        />

                        <Button variant="contained" onClick={handleSubmit}>
                            Add Playlist
                        </Button>
                    </FormControl>
                </Paper>
            )}
        </div>
    );
}
