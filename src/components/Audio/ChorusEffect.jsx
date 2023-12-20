import { SurroundSound, VolumeUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import * as Tone from "tone";
// Create a Chorus effect
const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();

const ChorusEffect = ({ player }) => {
    const [chorusEffect, setChorusEffect] = useState(false);
    const handleButtonClick = () => {
        // Adjust parameters as needed
        if (chorusEffect === true) {
            // Disconnect Chorus Effect
            player.disconnect(chorus);
            setChorusEffect(false);
        } else {
            // Connect the player to the Chorus effect
            player.connect(chorus);
            setChorusEffect(true);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleButtonClick}>
                <SurroundSound />
            </Button>
        </div>
    );
};

export default ChorusEffect;
