import { Button, Input, Stack, Typography } from "@mui/material";
import React from "react";

export default function ImageUploadCard({ coverRef }) {
    return (
        <Stack width={1} direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">Upload Cover :</Typography>
            <Button variant="outlined" fullWidth sx={{ marginLeft: "16px" }}>
                <Input inputRef={coverRef} accept="image/*" type="file" fullWidth />
            </Button>
        </Stack>
    );
}
