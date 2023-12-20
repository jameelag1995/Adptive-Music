import React, { useState, useEffect } from "react";
// import * as Tone from "tone";
import { Howl, Howler } from "howler";
import songurl from "../data/qafeledrill42.mp3";
function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    useEffect(() => {
        // Initialize Howler when the component mounts
        Howler.autoUnlock = false; // Disable auto-unlock for mobile devices
        Howler.volume(1.0); // Set the initial volume (0.0 to 1.0)

        // Create the Howl instance
        const newSound = new Howl({
            src: [songurl],
            html5: true,
            volume: 1.0, // Set the volume for this sound (0.0 to 1.0)
            onplay: () => setIsPlaying(true),
            onpause: () => setIsPlaying(false),
            onstop: () => setIsPlaying(false),
            onend: () => setIsPlaying(false),
            preload: true,
        });

        setSound(newSound);

        return () => {
            // Cleanup when the component unmounts
            if (newSound) {
                newSound.unload();
            }
        };
    }, []);

    const handlePlayPause = () => {
        if (isPlaying) {
            sound.pause();
        } else {
            sound.play();
        }
    };

    const handleStop = () => {
        sound.stop();
    };

    const changeTempo = (multiplier) => {
        const newRate = sound.rate() * multiplier;
        sound.rate(newRate);
    };

    const handleIncreaseTempo = () => {
        changeTempo(1.2);
    };

    const handleDecreaseTempo = () => {
        changeTempo(0.8);
    };
    return (
        <div>
            <button onClick={handlePlayPause}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleIncreaseTempo}>Increase Tempo</button>
            <button onClick={handleDecreaseTempo}>Decrease Tempo</button>
        </div>
    );
}

export default AudioPlayer;
