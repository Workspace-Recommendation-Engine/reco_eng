import React from "react";
import Navbar from "../navbar/navbar";
import "./landing.css"
import officeSpace from "../images/workspace drawing.png"


export default function Landing() {
    return(
        <>
        <Navbar></Navbar>

        <div id="landingContent"> 
            <div id="textBlurbDiv">
                <div id="textBlurbBox"> 
                    <h2 id="find"> Find Your Perfect </h2>
                    <h1 id="workspace"> Workspace </h1>
                    <p id="using">Using artificial intelligence we can find the best workspace match based on your preferences.</p>
                </div>
            </div>
            <div id="imageDiv">
                <img id="officeSpaceImg" src={officeSpace}></img>
            </div>
        </div>
         <h1> hey Im the landing page </h1>


        </>
    );
}
