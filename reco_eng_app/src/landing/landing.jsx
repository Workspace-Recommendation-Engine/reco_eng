import React from "react";
import Navbar from "../navbar/navbar";
import "./landing.css";
import officeSpace from "../images/workspace drawing.png";
import blob1 from "../images/blob1.png";
import blob2 from "../images/blob2.png";
import ellipse from "../images/Ellipse 1.png";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>

      <div id="landingContent">
        <div id="textBlurbDiv">
          <div id="textBlurbBox">
            <h2 id="find"> Find Your Perfect </h2>
            <h1 id="workspace"> Workspace </h1>
            <p id="using">
              Using artificial intelligence we can find the best workspace match
              based on your preferences.
            </p>
            <button id="signUpBtnLanding" onClick={() => navigate("/signUp")}>Sign Up</button>
          </div>
        </div>
        <div id="imageDiv">
          <img id="officeSpaceImg" src={officeSpace}></img>
        </div>
        <img id="ellipse" src={ellipse}></img>
        <img id="blob1" src={blob1}></img>
        <img id="blob2" src={blob2}></img>
      </div>
    </>
  );
}
