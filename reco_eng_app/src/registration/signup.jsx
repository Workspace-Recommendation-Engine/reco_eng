import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useNavigate, Link} from 'react-router-dom';
import Navbar from "../navbar/navbar";
import blob1 from "../images/blob1.png"
import blob2 from "../images/blob2.png"
import "./signup.css"
import { Grid } from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";
import formsLine from "../images/formsLine.png"
import Button from '@mui/material/Button';

//! Need to add form control

export default function Signup() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
      e.preventDefault();
      console.log(name);
      console.log(email);
      console.log(password);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        writeUserData(user.uid, name)
        navigate("/matches");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    };

    function writeUserData(id,name){
      const db = getDatabase();
      set(ref(db, "users/" + id),{
        uid: id,
        name: name
      })
    }


  return (
    <>
      <Navbar></Navbar>
    
      
      <div id="signUpDiv">
        <form id="signupForm" onSubmit={(e) => handleOnSubmit(e)}>
          <h1 id="create"> Create an Account </h1>
          <Grid container id="signUpGrid" direction={"column"} spacing={3}>
            <Grid item>
              <TextField id="standard-basic" label="Name" variant="outlined" value={name} size="small" sx={{width:"320px", '& .MuiOutlinedInput-root': {borderRadius: '10px', height:'50px', backgroundColor: "white"} }} onChange={(e) => setName(e.target.value)}/>
            </Grid>
            <Grid item>
              <TextField id="outlined-basic" label="Email" variant="outlined" value={email} sx={{width:"320px", '& .MuiOutlinedInput-root': {borderRadius: '10px', height:'50px',  backgroundColor: "white"} }}  onChange={(e) => setEmail(e.target.value)}/>
            </Grid>
            <Grid item>
              <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} sx={{width:"320px", '& .MuiOutlinedInput-root': {borderRadius: '10px', height:'50px',  backgroundColor: "white"} }}  onChange={(e) => setPassword(e.target.value)}/>
            </Grid>
            <Grid item>
              <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined" sx={{width:"320px", '& .MuiOutlinedInput-root': {borderRadius: '10px', height:'50px', backgroundColor: "white"}}} />
            </Grid>
            <Grid item>
            <Button variant="outlined" sx={{color: "white", borderColor:"white", height:"50px", width:"130px", borderRadius:"20px", fontSize: "17px"}} onClick={(e)=>handleOnSubmit(e)}>Sign Up</Button>
            </Grid>
          </Grid>
          <div id="otherFormNav">
            <a href="/login">
            <h3 id="dont"> Aready have an account? Click Here </h3>
            <img id="formsLineSignUp" src={formsLine}></img>
            </a>
        </div> 
        </form>
      </div>
      <img id="blob1" src={blob1}></img>
      <img id="blob2" src={blob2}></img>
    </>
  );
}
