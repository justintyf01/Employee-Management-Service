"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import LoginForm from "./components/forms/login-form";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useState } from "react";
import SignUpForm from "./components/forms/signup-form";

export default function Login() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Provider store={store}>
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Box className="flex flex-col items-center">
                    <Typography component="h1" variant="h5" className="font-bold" color="black">
                        {isLogin ? "Login" : "Sign-Up"}
                    </Typography>
                    {isLogin ? <LoginForm /> : <SignUpForm setIsLogin={setIsLogin} />}
                    <Button className="self-end mr-4" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign-up" : "Log in"}
                    </Button>
                </Box>
            </div>
        </Provider>
    );
}
