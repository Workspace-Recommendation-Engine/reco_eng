import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate, Link} from 'react-router-dom';
import { useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  onAuthStateChanged
} from "firebase/auth";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user, setUser] = React.useState(null); 
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
            console.log("user", user); 
        })
        if(user == null){
            navigate("/login");
        }
        else if(user != null){
            navigate("/");
        } 
        return () => {
            unsubscribe();
        }
    },[user]); 

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user; 
            console.log("user in login" , user)
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode , errorMessage);
        });
    }

    return(
        <>
         <h1> hey Im the login page </h1>
        <form id="signupForm" onSubmit={(e) => handleOnSubmit(e)}>
        <br/>
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <button type="submit" onClick={(e)=>handleOnSubmit(e)}> Submit </button>
      </form>
        </>
    );
}