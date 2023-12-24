import { GraphicEq } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import * as Tone from "tone";
const compressor = new Tone.Compressor().toDestination();
const CompressorEffect = ({ player }) => {
    const [compressorEffect, setCompressorEffect] = useState(false);

    const handleButtonClick = () => {
        // Create a Compressor effect
        // Adjust parameters as needed
        if (compressorEffect === true) {
            // Disconnect Compressor Effect
            player.disconnect(compressor);
            setCompressorEffect(false);
        } else {
            // Connect the player to the Compressor effect
            player.connect(compressor);
            setCompressorEffect(true);
        }
    };

    return (
        <Tooltip title="Compressor" placement="top">
            <Button variant="outlined" onClick={handleButtonClick}>
                <GraphicEq />
            </Button>
        </Tooltip>
    );
};

export default CompressorEffect;
