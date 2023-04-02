import React from "react";
import { useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Navbar from "../navbar/navbar";
import "./matches.css"

export default function Matches() {
    const navigate = useNavigate();
    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("logout successful!")
            navigate("/login");

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode , errorMessage);
        });
    } 
  return (
    <>
      <Navbar></Navbar>
      <div id="matchesHeader"> <h1>Your Workspace Matches</h1> </div>
      
      
    </>
  );
}