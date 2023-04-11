import React from "react";
import Navbar from "../navbar/navbar";
import officeSpace from "../images/workspace drawing.png";
import blob1 from "../images/blob1.png";
import blob2 from "../images/blob2.png";
import ellipse from "../images/Ellipse 1.png";
import { useNavigate } from "react-router-dom";
import "./signup2.css"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import workCafe from "../images/WorkCafe.jpeg";
import libraryPhoto from "../images/libraryPhoto.jpeg"
import coworkingSpace from "../images/coworkingSpace.jpeg"
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button';
import { getDatabase, ref, get, child, set } from "firebase/database";
import {getAuth} from "firebase/auth";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = styled(Slider)({
  color: '#ffa929',
  height: 8,
  width: 240,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#ffa929',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});


export default function SignUp2() {

  const [cafeRating, setCafeRating] = React.useState(0);
  const [libraryRating, setLibraryRating] = React.useState(0);
  const [coWorkingRating, setcoWorkingRating] = React.useState(0);
  const [currUser, setCurrUser] = React.useState(0); 
  
  // useEffect(() => {
  //   const user = getAuth().currentUser;
  //   console.log("user in sign up 2:" + user?.name);
  //   setCurrUser(currUser)
  // }, []);

  const user = getAuth().currentUser;
  useEffect(() => {
    console.log("cafe rating: " , cafeRating)
    console.log("library rating: " , libraryRating)
    console.log("coWorking rating: " ,coWorkingRating)
    console.log("user in sign up 2:" + user?.uid);
  },[cafeRating,libraryRating,coWorkingRating])

  function postCategoryRatings (){
    // Get a reference to the database
    
    let rating = null; 
    for(let i = 0; i <= 17; i++){
      console.log("i is: " + i)
      const db = getDatabase();
    if(i <= 1 || i >= 3 && i <=7 || i >= 9 && i <=11 || i >= 15 && i <=16){
      rating = cafeRating; 
    }
    else if ( i == 2 || i == 8){
      rating = coWorkingRating;
    }
    else{
      rating = libraryRating;
    }
    // Create the data object
    const data = {
      categoryID: i,
      uid: user.uid,
      rating: rating
    };
    // Write the data to the database
    // const id = "1"; 
    set(ref(db, "categoryRatings/categoryRating" + i + "_" + user.uid), data)
      .then(() => {
        console.log("Data saved successfully.");
      })
      .catch((error) => {
        console.log("Data could not be saved." + error);
      });
    }
  }



  return (
    <>
      <Navbar></Navbar>

      <div id="signUp2Div">
        <h1 id="WhatType">Rate the Following Workspaces</h1>
        <p style={{color: "rgb(90, 90, 90)", fontWeight: "500"}}> With 1 being the least prefered and 5 being the most prefered </p>
        <Grid container id="signUpGrid" direction={"row"} spacing={3} sx={{justifyContent: "center"}}>
            <Grid item>
                <Box sx={{ height: "200px", width: "350px"}}>
                    <Box sx={{}}>
                        <img id="categoryImages" style={{height: "200px", width: "300px", borderRadius: "20px"}} src={workCafe}></img>
                    </Box>
                    <Box sx={{marginTop:"20px"}}>
                        <div id="categoryName">Cafe or Bakery </div>
                        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} max={5} onChange={(_, value) => setCafeRating(value)}/>
                    </Box>
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{ height: "200px", width: "350px"}}>
                    <Box sx={{}}>
                        <img id="categoryImages" style={{height: "200px", width: "300px", borderRadius: "20px"}} src={libraryPhoto}></img>
                    </Box>
                    <Box sx={{marginTop:"20px"}}>
                        <div id="categoryName">Library</div>
                        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} max={5} onChange={(_, value) => setLibraryRating(value)}/>
                    </Box>
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{ height: "200px", width: "350px"}}>
                    <Box sx={{}}>
                        <img id="categoryImages" style={{height: "200px", width: "300px", borderRadius: "20px"}} src={coworkingSpace}></img>
                    </Box>
                    <Box sx={{marginTop:"20px"}}>
                        <div id="categoryName">Co-working Space</div>
                        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} max={5} onChange={(_, value) => setcoWorkingRating(value)}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        <Button variant="outlined" sx={{marginTop: "15vh", color: "white", borderColor:"white", height:"50px", width:"130px", borderRadius:"20px", fontSize: "17px"}} onClick={()=>postCategoryRatings()}>Done</Button>
        {/* add done button to make submission easier <div> <button> done </button> </div> */}
      </div>
      <img id="blob1" src={blob1}></img>
      <img id="blob2" src={blob2}></img>
    </>
  );
}
