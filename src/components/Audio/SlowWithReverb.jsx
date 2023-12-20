import { SlowMotionVideo } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import * as Tone from "tone";

const reverb = new Tone.Freeverb({
    roomSize: 0.5, // Adjust the room size
    dampening: 3000, // Adjust the dampening
}).toDestination();
export default function Reverb({ player }) {
    const [slowReverbEffect, setSlowReverbEffect] = useState(false);

    const handleButtonClick = () => {
        // Create a reverb effect
        // Adjust parameters as needed
        if (slowReverbEffect === true) {
            // Disconnect reverb Effect
            player.disconnect(reverb);
            setSlowReverbEffect(false);
        } else {
            // Connect the player to the reverb effect
            player.connect(reverb);
            setSlowReverbEffect(true);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleButtonClick}>
                <SlowMotionVideo />
            </Button>
        </div>
    );
}
