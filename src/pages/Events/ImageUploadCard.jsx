import { Button, Input, Stack } from "@mui/material";
import React from "react";

export default function ImageUploadCard({ coverRef }) {
    return (
        <Stack width={1} direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" fullWidth>
                Upload Event Cover
                <Input inputRef={coverRef} accept="image/*" type="file" />
            </Button>
        </Stack>
    );
}
