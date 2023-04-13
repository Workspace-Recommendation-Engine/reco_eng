import React from "react";
import Navbar from "../navbar/navbar";
import officeSpace from "../images/workspace drawing.png";
import blob1 from "../images/blob1.png";
import blob2 from "../images/blob2.png";
import ellipse from "../images/Ellipse 1.png";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      <Navbar></Navbar>
      <h1> About Us </h1>

      <img id="blob1" src={blob1}></img>
      <img id="blob2" src={blob2}></img>
    </>
  );
}
