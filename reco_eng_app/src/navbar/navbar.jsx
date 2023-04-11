import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./navbar.css"
import coffeeMug from "../images/coffeeMug.jpg"


//Coffee mug image by <a href="https://www.freepik.com/free-vector/flat-design-cafe-signage_22203365.htm#query=solo%20steaming%20coffee%20mug&position=3&from_view=search&track=ais">Freepik</a>

export default function Navbar(){
    const navigate = useNavigate();
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = React.useState(false);


    const user = getAuth().currentUser;

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
            <div id="logo"> <a href="/"> <img src={coffeeMug} style={{maxHeight: "44px", marginRight: "20px"}}></img> </a> </div>
            <Stack spacing={10} direction="row" id="buttonStack" style={{justifyContent: "right", width: "82%", marginBottom: "1vh", marginTop:"1vh"}}>
                <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none',  ":hover": {bgcolor: "#AF5",color: "white"}}} onClick={() => navigate("/howItWorks")} > How it Works? </Button>
                <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none'}} onClick={() => navigate("/aboutUs")} > About Us </Button>
                {user ? <Button variant="text" style={{color : "black", fontSize: "17px", textTransform: 'none'}} onClick={() => navigate("/matches")} > Matches </Button>: <></>}
                {user ? <button id="loginBtn" onClick={() => logout()}> Log Out </button> : <button id="loginBtn" onClick={() => navigate("/login")}> Login </button> }
            </Stack>
        </div>
        <div id="lineContainer">
                <div id="line"></div>
        </div>
     </>
    )
}