import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./navbar.css"


//! I want to change the background color of navbar buttons but mui buttons are being difficult 

export default function Navbar(){
    const navigate = useNavigate();

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("sign out successful!")
            navigate("/login");

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode , errorMessage);
        });
    } 
    return(
        <>
        <div id="navbar">
            <div id="logo"> Logo </div>
            <Stack spacing={10} direction="row" id="buttonStack" style={{justifyContent: "right", width: "82%", marginBottom: "1vh", marginTop:"1vh"}}>
                <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none', borderRadius: "20%", ":hover": {bgcolor: "#AF5",color: "white"}}} onClick={() => navigate("/howItWorks")} > How it Works? </Button>
                <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none', borderRadius: "20%"}} onClick={() => navigate("/aboutUs")} > About Us </Button>
                <button id="loginBtn" onClick={() => navigate("/login")}> Login </button>
            </Stack>
        </div>
        <div id="lineContainer">
                <div id="line"></div>
            </div>
     </>

    )
}