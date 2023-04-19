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
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { getDatabase, ref, get, child, set, orderByChild, equalTo, onValue, query } from "firebase/database";
import {editWorkspaceRatings} from "../backend/matchesVector.js"
import {getMatches} from "../backend/categoryVector.js"
import {topTen} from "../backend/categoryVector.js";

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
  width: 200,
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



export default function Matches() {
 
  let workspaces = []
  //!dont delete use this code to read workspace objects later when they are returned from the model 
  // useEffect(() => {
  //   readWorkspaces()
  // function readWorkspaces (){
  //   const db = getDatabase();
  //   const workspacesRef = ref(db, 'workspaces');
  //   console.log("here")
  //   onValue(workspacesRef, (snapshot) => {
  //     workSpaces = snapshot.val()
  //     console.log("data in matches page: " + workSpaces[0].name)
  //   }, (error) => {
  //     console.log("Error reading data: " + error.code);
  //   });

  // }
  // },[]);  


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

  

  //creating workspace object 
  const workspaceObj0 = {
    address: "111 Gran Via",
    category: "cafe", 
    id: "0", 
    latitude: "0",
    longitude: "0",
    name: "Tartas y Cafe",
    image: workCafe 
  }

  const workspaceObj1 = {
    address: "111 Gran Via",
    category: "cafe", 
    id: "1", 
    latitude: "0",
    longitude: "0",
    name: "Tartas y Cafe",
    image: workCafe 
  }

  const workspaceObj2 = {
    address: "111 Gran Via",
    category: "cafe", 
    id: "2", 
    latitude: "0",
    longitude: "0",
    name: "Tartas y Cafe",
    image: workCafe 
  }

  const [testArr, setTestArr] = React.useState([
   workspaceObj0,
   workspaceObj1,
   workspaceObj2,
   workspaceObj0
  ]);

  const [workspaceRating, setWorkspaceRating] = React.useState(0)
  const [currID, setCurrID] = React.useState(""); 

  useEffect(() => {
    if(workspaceRating != 0){
      console.log("id is: " + currID); 
      const user = getAuth().currentUser;
      editWorkspaceRatings(currID, user.uid, workspaceRating) //updating ratings vector
    }
  },[workspaceRating]); 



  
  let firstItem = false; 

  function MatchIndex ({index}){
    if(index == 0){
      firstItem = true; 
    }
    else if (index > 0 && index < testArr.length) {
      firstItem = false;
    }
    return(
      <>
      { firstItem ? <Grid item sx={{color: "#E7951B", fontWeight: "600" }}> Best Match </Grid> : <Grid item sx={{color: "#557B7C", fontWeight: "600"}}> Match Rank: {index + 1} </Grid>}
      </>
    )
  }

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
        {testArr.map((item, index) => (
          <Grid item xs={2} md={3} sx={{marginTop: "30px"}}>
            <Box sx={{ }}>
              <Box sx={{height: "200px", width: "100%"}}>
                  <Carousel
                    id="carouselStyle"
                    indicators={true}
                    autoPlay={false}
                    sx={{  height: "200px", textAlign:"center" }} 
                  >
                    <div id="thumbnail">
                      <img id="thumbnailImg" src={item?.img_url}></img>
                    </div>
                  </Carousel>
              </Box>
              <Box sx={{}}>
                <div id="itemDescription">
                  <Grid container spacing={3}>
                    <Grid item>{item?.name}</Grid>
                    <Grid item>{item?.category}</Grid>
                    <MatchIndex index={index} />
                  </Grid>
                  <div id="break"> </div>
                  <div id="itemDescription2">
                    <button id="addressBtn"> Address </button>
                    <p id="hours"> Open Now</p>
                  </div>
                </div>
                <div style={{display: "flex"}}>
                  <div style={{marginTop:"5px"}}> Rate: </div>
                  <div style={{marginLeft:"20px"}}><PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} max={5} onChange={(_, value) => {setWorkspaceRating(value); setCurrID(item?.id)}}/></div>
                </div>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      </div>
      <img id="blob1" src={blob1}></img>
      <img id="blob2" src={blob2}></img>
    </>
  );
}
