import React from "react";
import { useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";


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
      <h1>hi I am the matches page</h1>
      <button onClick={logout}> Log Out </button>
    </>
  );
}