import { Add, ArrowBack, Close } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
export default function Library() {
    const navigate = useNavigate();
    const titleRef = useRef();
    const coverRef = useRef();
    const descriptionRef = useRef();
    const [addingPlaylist, setAddingPlaylist] = useState(false);
    const [playlistsData, setPlaylistsData] = useState();
    const handleAddPlaylist = () => {
        console.log("clicked");
        setAddingPlaylist(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("add playlist clicked");
        setPlaylistsData([
            ...playlistsData,
            {
                title: titleRef.current.value,
                cover: coverRef.current.value,
                description: descriptionRef.current.value,
            },
        ]);
        setAddingPlaylist(false);
    };
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
                                title={event.title}
                                img={event.cover}
                                description={event.description}
                            />
                        );
                    })
                )}
            </div>

            {addingPlaylist && (
                <Paper
                    sx={{
                        zIndex: 3,
                        width: 1,
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
                        onClick={() => setAddingEvent(false)}
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

                        <ImageUploadCard coverRef={coverRef} />
                        <Button variant="contained" onClick={handleSubmit}>
                            Add Playlist
                        </Button>
                    </FormControl>
                </Paper>
            )}
        </div>
    );
}
