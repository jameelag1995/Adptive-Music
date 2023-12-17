import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";

export default function ForgotPassword() {
    const { resetPassword } = useAuth();
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMsg("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMsg("Check your inbox for further instructions ");
        } catch (err) {
            console.log(err);
            setError("Failed to reset password ");
        }
        setLoading(false);
    };
    return (
        <div className="login-form-container">
            <Typography variant="h3">Reset Password</Typography>
            <form id="login-form" onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email"
                        label="Email"
                        inputRef={emailRef}
                        type="email"
                        size="large"
                    />
                </FormControl>
                <Button variant="contained" type="submit" disabled={loading}>
                    Reset Password
                </Button>
                {msg && <BasicModal msg={msg} setMsg={setMsg} />}
                {error && <BasicModal msg={error} setMsg={setError} />}
            </form>
        </div>
    );
}
