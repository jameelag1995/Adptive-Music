import { Button, ButtonGroup, Paper } from "@mui/material";
import React from "react";

export default function SearchCategory() {
    return (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Tracks</Button>
            <Button>Artists</Button>
            <Button>Albums</Button>
            <Button>Playlists</Button>
        </ButtonGroup>
    );
}
