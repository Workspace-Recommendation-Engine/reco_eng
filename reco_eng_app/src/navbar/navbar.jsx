import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./navbar.css"


//! I want to change the background color of navbar buttons but mui buttons are being difficult 

export default function Navbar(){
    const navigate = useNavigate();
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = React.useState(false);

    auth.onAuthStateChanged(function(user) {
        if(user) {
            setLoggedIn(true);
        }
    })

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
            <div id="logo"> <a href="/"> Logo </a> </div>
            <Stack spacing={10} direction="row" id="buttonStack" style={{justifyContent: "right", width: "82%", marginBottom: "1vh", marginTop:"1vh"}}>
                <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none', borderRadius: "20%", ":hover": {bgcolor: "#AF5",color: "white"}}} onClick={() => navigate("/howItWorks")} > How it Works? </Button>
                <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none', borderRadius: "20%"}} onClick={() => navigate("/aboutUs")} > About Us </Button>
                {loggedIn ? <button id="loginBtn" onClick={() => logout()}> Log Out </button> : <button id="loginBtn" onClick={() => navigate("/login")}> Login </button> }
            </Stack>
        </div>
        <div id="lineContainer">
                <div id="line"></div>
            </div>
     </>

    )
}