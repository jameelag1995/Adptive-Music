import { Add, Close, HdrPlus } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import {
    Button,
    Card,
    FormControl,
    Input,
    InputLabel,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "./Events.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    DateField,
    DatePicker,
    DateTimePicker,
    LocalizationProvider,
    TimeField,
    TimePicker,
} from "@mui/x-date-pickers";
import ImageUploadCard from "./ImageUploadCard";
import BasicCard from "../../components/Card/BasicCard";
import EventCard from "../../components/Card/EventCard";
import { musicalEvents } from "../../data/data";
const eventDemo = {
    title: "New Years Party ",
    lineup: "travis scott, drake, j.cole, kendrick lamar",
    date: "31-12-2023",
    time: "8pm",
    ticketUrl: "www.google.com",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "lorem impsum",
    location: "New York",
};
export default function Events() {
    const [eventsData, setEventsData] = useState(musicalEvents);
    const [addingEvent, setAddingEvent] = useState(false);
    const [isArtist, setIsArtist] = useState(false);
    const titleRef = useRef();
    const locationRef = useRef();
    const lineupRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const ticketsUrlRef = useRef();
    const coverRef = useRef();
    const descriptionRef = useRef();
    const handleAddEvent = () => {
        console.log("clicked");
        setAddingEvent(true);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("add event clicked");
        setEventsData([
            ...eventsData,
            {
                title: titleRef.current.value,
                lineup: lineupRef.current.value,
                date: dateRef.current.value,
                time: timeRef.current.value,
                ticketUrl: ticketsUrlRef.current.value,
                cover: coverRef.current.value,
                description: descriptionRef.current.value,
                location: locationRef.current.value,
            },
        ]);
        setAddingEvent(false);
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
            <div className="eventsContainer">
                {eventsData.map((event, index) => {
                    return (
                        <EventCard
                            key={index}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            lineup={event.lineup}
                            img={event.cover}
                            description={event.description}
                            ticketUrl={event.ticketUrl}
                            location={event.location}
                        />
                    );
                })}
            </div>

            {addingEvent && (
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
                        <Typography variant="h3">Event Details</Typography>
                        <TextField
                            inputRef={titleRef}
                            id="outlined-multiline-flexible"
                            label="Title"
                            multiline
                            maxRows={4}
                            fullWidth
                        />

                        <TextField
                            inputRef={lineupRef}
                            id="outlined-multiline-flexible"
                            label="Lineup"
                            multiline
                            maxRows={4}
                            fullWidth
                        />
                        <TextField
                            inputRef={locationRef}
                            id="outlined-multiline-flexible"
                            label="Location"
                            multiline
                            maxRows={4}
                            fullWidth
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                inputRef={dateRef}
                                defaultValue={dayjs("2024-04-17")}
                                sx={{ width: 1 }}
                            />

                            <TimePicker
                                inputRef={timeRef}
                                defaultValue={dayjs("2024-04-17T15:30")}
                                sx={{ width: 1 }}
                            />
                        </LocalizationProvider>
                        <TextField
                            inputRef={descriptionRef}
                            id="outlined-multiline-flexible"
                            label="Event Description"
                            multiline
                            maxRows={4}
                            fullWidth
                        />
                        <TextField
                            inputRef={ticketsUrlRef}
                            id="outlined-multiline-flexible"
                            label="Where To Buy Tickets"
                            multiline
                            maxRows={4}
                            fullWidth
                        />
                        <ImageUploadCard coverRef={coverRef} />
                        <Button variant="contained" onClick={handleSubmit}>
                            Add Event
                        </Button>
                    </FormControl>
                </Paper>
            )}
            <BottomNavBar />
        </div>
    );
}
