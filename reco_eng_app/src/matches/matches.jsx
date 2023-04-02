import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Navbar from "../navbar/navbar";
import "./matches.css";
import Grid from "@mui/material/Grid";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import workCafe from "../images/WorkCafe.jpeg";

export default function Matches() {
  const navigate = useNavigate();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logout successful!");
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const [testArr, setTestArr] = React.useState([workCafe, workCafe, workCafe]);

  return (
    <>
      <Navbar></Navbar>
      <div id="matchesHeader">
        <h1>Your Workspace Matches</h1>
      </div>

      <Grid
        container
        spacing={3}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        {testArr.map((item) => (
          <Grid item xs={2} md={3}>
            <Box sx={{border: "1px solid blue"}}>
              <Box sx={{height: 200}}>
                <Carousel id="carouselStyle" indicators={true} autoPlay={false} sx={{border: "1px solid orange"}} >
                  <div id="thumbnail">
                    <img id="thumbnailImg" src={item}></img>
                  </div>
                </Carousel>
              </Box>
              <Box sx={{ border: "1px solid red" }}>
                <div id="itemDescription">
                  <Grid container spacing={3}>
                    <Grid item>Name</Grid>
                    <Grid item>Type</Grid>
                    <Grid item>Match Rank</Grid>
                  </Grid>
                  <div id="break"> </div>
                  <div id="itemDescription2">
                    <button id="addressBtn"> Address </button>
                    <p id="hours">Hours:</p>
                  </div>
                </div>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
