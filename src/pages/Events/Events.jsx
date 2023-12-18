import { Add, Close, HdrPlus } from "@mui/icons-material";
import React, { useState } from "react";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { FormControl, Input, Paper, Typography } from "@mui/material";
import "./Events.css";
export default function Events() {
    const [eventsData, setEventsData] = useState([]);
    const [addingEvent, setAddingEvent] = useState(false);
    const [isArtist, setIsArtist] = useState(false);
    const handleAddEvent = () => {
        console.log("clicked");
        setAddingEvent(true);
    };
    return (
        <div className="Events Page">
            <div
                className="add-event"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    marginTop: "16px",
                }}
            >
                <Typography variant="h4">Events</Typography>
                <Add
                    onClick={handleAddEvent}
                    sx={{ width: "40px", height: "40px" }}
                />
            </div>
            {addingEvent && (
                <Paper sx={{width:1,position:"relative",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Close onClick={() => setAddingEvent(false)} sx={{position:"absolute",right:"10px",top:"10px"}}/>
                    <FormControl>
                        <Input  />
                        <Input />
                        <Input />
                    </FormControl>
                </Paper>
            )}
            <BottomNavBar />
        </div>
    );
}
