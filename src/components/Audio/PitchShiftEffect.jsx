import { SpatialAudio } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import * as Tone from "tone";
// Create a Pitch Shift effect
const pitchShift = new Tone.PitchShift().toDestination(); // Adjust parameters as needed

const PitchShiftEffect = ({ player }) => {
    const [pitchShiftEffect, setPitchShiftEffect] = useState(false);
    const handleButtonClick = () => {
        if (pitchShiftEffect === true) {
            // Disconnect PitchShift Effect
            player.disconnect(pitchShift);
            setPitchShiftEffect(false);
        } else {
            // Connect the player to the PitchShift effect
            player.connect(pitchShift);
            setPitchShiftEffect(true);
        }
    };

    return (
        <Tooltip title="Pitch Shift" placement="top">
            <Button variant="outlined" onClick={handleButtonClick}>
                <SpatialAudio />
            </Button>
        </Tooltip>
    );
};

export default PitchShiftEffect;
