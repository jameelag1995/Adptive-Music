import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "./AudioPlayer.css";
// import songurl from "../data/qafeledrill42.mp3";
// import songUrl from "../data/efhamne.mp3";
import aram from "../../assets/tracks/burnit.wav";
// import { getTempo } from "./getTempo";
import edSheeran from "../../assets/tracks/Ed_Sheeran_Shape_of_You.mp3";
import CompressorEffect from "./CompressorEffect";
import ChorusEffect from "./ChorusEffect";
import PitchShiftEffect from "./PitchShiftEffect";
import SlowWithReverb from "./SlowWithReverb";

import { useNavigate, useParams } from "react-router-dom";
import { Button, Slide, Typography } from "@mui/material";
import {
    AddToPhotos,
    ArrowBack,
    Equalizer,
    FastForward,
    FastRewind,
    HorizontalRule,
    PauseCircle,
    PlayCircle,
    Restore,
    Share,
    Speaker,
    Stop,
    Tune,
    Update,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "@emotion/react";
// let shifterVal = 2;
let player;
let reverb;
let tempoMultiplier = 1.0;
// const shifter = new Tone.PitchShift(shifterVal * 2);
// player.connect(shifter);
export default function AudioPlayerTone() {
    const { currentUser } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const { trackId } = useParams();
    const [tuneClicked, setTuneClicked] = useState(false);
    useEffect(() => {
        if (trackId == 1) {
            player = new Tone.Player(edSheeran).toDestination();
        } else if (trackId == 2) {
            player = new Tone.Player(aram).toDestination();
        }

        reverb = new Tone.Freeverb({
            roomSize: 0.8, // Adjust the room size
            dampening: 3000, // Adjust the dampening
        }).toDestination();

        player.playbackRate = tempoMultiplier;
    }, []);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [currBpm, setCurrBpm] = useState(Tone.Transport.bpm.value);
    const [isPlaying, setIsPlaying] = useState(false);
    const [change, setChange] = useState(false);
    // useEffect(() => {
    //     console.log(player.context.state);
    //     return () => {
    //         // Cleanup when the component is unmounted
    //         Tone.Transport.stop();
    //         player.dispose();
    //     };
    // }, []);

    const handlePlay = () => {
        if (Tone.context.state !== "running") {
            Tone.Transport.start();
        }
        player.start(undefined, playbackPosition);
        console.log(player);
        console.log(player.context.state);
        console.log(Tone);

        setIsPlaying(true);
    };
    const handlePause = () => {
        setPlaybackPosition(Tone.Transport.seconds);
        // Tone.Transport.stop();
        player.stop();
        setIsPlaying(false);
    };

    const handleStop = () => {
        player.stop();
        Tone.Transport.stop();
        Tone.Transport.position = 0;
        setPlaybackPosition(0);

        setIsPlaying(false);
    };
    const handleIncreaseTempo = () => {
        // console.log('incease');
        // let currBpm = Tone.Transport.bpm.value;
        // Tone.Transport.bpm.value *= 1.2;
        // Tone.Transport.start();
        // Tone.Transport.bpm.rampTo(currBpm * 2, 10);
        // console.log(shifter);
        // shifter.pitch = 12;
        setChange((prev) => !prev);
        console.log("increase playbackRate");

        tempoMultiplier *= 1.2; // Adjust the multiplier as needed
        player.playbackRate = tempoMultiplier;
        setCurrBpm((prevBpm) => prevBpm * 1.2);
    };
    const handleDecreaseTempo = () => {
        setChange((prev) => !prev);
        console.log("decrease playbackRate");

        tempoMultiplier /= 1.2; // Adjust the multiplier as needed
        player.playbackRate = tempoMultiplier;
        console.log(typeof currBpm);
        adjustReverbForTempo(currBpm / 1.2);
        // player.connect(reverb);
        setCurrBpm((prevBpm) => prevBpm / 1.2);
    };

    function adjustReverbForTempo(tempo) {
        // Assuming tempo is in beats per minute (BPM)
        console.log(tempo);
        // Scale roomSize based on tempo
        const roomSize = Math.min(1, tempo / 120);

        // Decrease dampening with slower tempos
        const dampening = 3000 - (tempo - 120) * 20;
        console.log(dampening);

        console.log(reverb.dampening.value);
        // Apply the new reverb settings
        changeReverbSettings(roomSize, dampening);
    }
    function changeReverbSettings(roomSize, dampening) {
        // Adjust reverb settings
        reverb.roomSize.value = roomSize;
        reverb.dampening = dampening;
    }

    return (
        <>
            <Slide in direction="up">
                <div className="Player Page">
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
                        style={{
                            width: "400px",
                            height: "400px",
                            borderRadius: "6px",
                        }}
                        src="https://img.freepik.com/free-photo/top-view-vinyl-record-arrangement_23-2149075968.jpg?w=826&t=st=1703062266~exp=1703062866~hmac=7224079dbca1754c1c9e259d9ff4c6ebd1881790c67690b0106deb38e9090bda"
                        alt="track cover"
                    />
                    <div className="track-info">
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "left", width: 1 }}
                        >
                            {trackId == 1 ? "Shape of You" : "Burn It"}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{ textAlign: "left", width: 1 }}
                            color="grey"
                        >
                            {trackId == 1 ? "Ed Sheeran" : "Aram"}
                        </Typography>
                    </div>
                    <div className="extra-buttons">
                        <Tune
                            sx={{ width: "40px", height: "40px" }}
                            onClick={() => setTuneClicked((prev) => !prev)}
                        />{" "}
                        {tuneClicked && (
                            <Slide
                                easing={{
                                    enter: theme.transitions.easing.easeOut,
                                    exit: theme.transitions.easing.easeOut,
                                }}
                                in
                                direction="right"
                                style={{ transitionDuration: 600 }}
                            >
                                <div className="filter-btns-container">
                                    {/* <Button onClick={handlePlay}>Play</Button>
                                <Button onClick={handlePause}>Pause</Button> */}
                                    <Button
                                        variant="outlined"
                                        onClick={handleStop}
                                    >
                                        <Stop />
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        onClick={handleDecreaseTempo}
                                    >
                                        <Restore />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleIncreaseTempo}
                                    >
                                        <Update />
                                    </Button>
                                    <CompressorEffect player={player} />
                                    <ChorusEffect player={player} />
                                    <PitchShiftEffect player={player} />
                                    <SlowWithReverb player={player} />
                                </div>
                            </Slide>
                        )}
                        <AddToPhotos sx={{ width: "40px", height: "40px" }} />
                    </div>
                    {/* track timeline */}

                    <Typography variant="h6">{`Current Duration after effect: ${(
                        player?.buffer.duration /
                        player?.playbackRate /
                        60
                    ).toFixed(2)} min`}</Typography>
                    <div className="player-buttons">
                        <FastRewind sx={{ width: "64px", height: "64px" }} />
                        {isPlaying ? (
                            <PauseCircle
                                sx={{ width: "64px", height: "64px" }}
                                onClick={() => {
                                    setIsPlaying(false);
                                    handlePause();
                                }}
                            />
                        ) : (
                            <PlayCircle
                                sx={{ width: "64px", height: "64px" }}
                                onClick={() => {
                                    setIsPlaying(true);
                                    handlePlay();
                                }}
                            />
                        )}
                        <FastForward sx={{ width: "64px", height: "64px" }} />
                    </div>
                    <div className="bottom-buttons">
                        <div className="playing-on">
                            <Speaker sx={{ width: "32px", height: "32px" }} />
                            <Typography variant="h7" sx={{ textAlign: "left" }}>
                                {currentUser.displayName}{" "}
                            </Typography>
                        </div>
                        <Share />
                    </div>
                </div>
            </Slide>
        </>
    );
}
