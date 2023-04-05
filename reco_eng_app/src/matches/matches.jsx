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
import verticalCafe from "../images/verticalImage.jpeg";
import blob1 from "../images/blob1.png"
import blob2 from "../images/blob2.png"


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

  const [testArr, setTestArr] = React.useState([
    workCafe,
    workCafe,
    verticalCafe,
    verticalCafe,
    verticalCafe
  ]);

  return (
    <>
      <Navbar></Navbar>
      <div id="matchesHeader">
        <h1 id="yourWorkspaceMatches">Your Workspace Matches</h1>
     

      <Grid
        container
        spacing={3}
        sx={{justifyContent: "flex-begin" }}
      >
        {testArr.map((item) => (
          <Grid item xs={2} md={3} sx={{marginTop: "30px"}}>
            <Box sx={{ }}>
              <Box sx={{ height: "200px", width: "100%"}}>
    
                  <Carousel
                    id="carouselStyle"
                    indicators={true}
                    autoPlay={false}
                    sx={{  height: "200px", textAlign:"center" }}  /*change something with the height of carousel */
                  >
                    <div id="thumbnail">
                      <img id="thumbnailImg" src={item}></img>
                    </div>
                  </Carousel>
              </Box>
              <Box sx={{}}>
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
      </div>

        {/* figure out how ot send these to the back  */}
      <img id="blob1" src={blob1}></img>
      <img id="blob2" src={blob2}></img>
    </>
  );
}
