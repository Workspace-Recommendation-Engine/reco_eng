import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";


export default function Signup() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleOnSubmit = (e) => {
      e.preventDefault();
      console.log(email);
      console.log(password);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    };

  return (
    <>
      <h1> hey Im the signup page </h1>
      <form id="signupForm" onSubmit={(e) => handleOnSubmit(e)}>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
        <br/>
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined" />
        <button type="submit" onClick={(e)=>handleOnSubmit(e)}> Submit </button>
      </form>
    </>
  );
}
