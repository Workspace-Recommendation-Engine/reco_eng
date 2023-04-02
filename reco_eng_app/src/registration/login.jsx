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
import Navbar from "../navbar/navbar";
import { Grid } from "@mui/material";
import "./login.css"
import Button from '@mui/material/Button';
import formsLine from "../images/formsLine.png"
import books from "../images/books.png"

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
            navigate("/matches");
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
            navigate("/matches")
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
        <Navbar></Navbar>
        <form id="logInForm" onSubmit={(e) => handleOnSubmit(e)}>
        <h1 id="LogIn"> Log In </h1>
        <Grid container id="signUpGrid" direction={"column"} spacing={3}>
            <Grid item>
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email} sx={{width:"320px", '& .MuiOutlinedInput-root': {borderRadius: '10px', height:'50px',  backgroundColor: "white"} }}  onChange={(e) => setEmail(e.target.value)}/> 
            </Grid>
            <Grid item>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} sx={{width:"320px", '& .MuiOutlinedInput-root': {borderRadius: '10px', height:'50px',  backgroundColor: "white"} }}  onChange={(e) => setPassword(e.target.value)}/>
            </Grid>
            <Grid item>
            <Button variant="outlined" sx={{color: "white", borderColor:"white", height:"50px", width:"130px", borderRadius:"20px", fontSize: "17px"}} onClick={(e)=>handleOnSubmit(e)}>Log In</Button>
            </Grid>
        </Grid>  
        <div id="otherFormNav">
            <a href="/signup">
            <h3 id="dont"> Don’t have an account? Click Here </h3>
            <img id="formsLine" src={formsLine}></img>
            </a>
        </div>      
      </form>
        <img id="books" src={books}></img>
        </>
    );
}