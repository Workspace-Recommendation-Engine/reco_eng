import React from "react";
import Navbar from "../navbar/navbar";
import "./howItWorks.css"
import blob1 from "../images/blob1.png"
import blob2 from "../images/blob2.png"

export default function HowItWorks() {
  return (
    <>
      <Navbar></Navbar>
      <div id="infoParagraph">
          <h1 id="sarV1">  SAR Version 1 </h1>
        <p>
         
          1. First, we extract the ratings for each workspace
          location by generating 100 random rows of data with a uniform
          distribution between 1 and 5 (inclusive). We assign each of these rows
          to a new user identifier, ‘User_1” through “User_100.” <br/><br/> 
          
          2. Next, we group
          the data by the category of each workspace location and calculate the
          average rating for each category across all users. We round these
          values to one decimal place for readability. <br/> <br/> 
          
          3. We drop the Workspace_Id
          row from the category averages data frame. <br/><br/> 
          
          4. We create a data frame with indices and columns equal to the Workspace_Id values and populate it
          with the average ratings between each pair of workspace locations.
          This is done by looping through each pair of workspaces and calculating their average rating. <br/><br/> 
          
          5. We calculate the recommendation scores for each workspace location by multiplying the workspace-to-workspace affinity matrix by the User_1 affinity vector.
          This produces a recommendation score for each workspace location. <br/> <br/> 
          
          6. We create a data frame with the recommendation scores for each workspace
          location and sort it in descending order to get the top-recommended
          workspaces for User_1. <br/> <br/> 
          
          7. We print the details for the top 5 recommended
          workspaces for User_1, including the name, address, category, price
          range, and overall rating. <br/> <br/> 
          
          8. Finally, we print the details for the top 5
          recommended workspaces for User_1, using a for loop. For each of the
          top 5 recommended workspaces, we increment a ‘top’ variable to keep
          track of the ranking, print the top choice number using an f-string,
          and call the ‘print_workspace()’ function to print the details of the
          recommended workspace. This function extracts relevant information
          from the ‘clean_df’ data frame and formats it for display. <br/> <br/> 
          
          In summary,
          the SAR model for the workspace recommendation engine generates a
          workspace-to-workspace affinity matrix based on the average ratings
          for each category of workspace location, and then uses this matrix to
          calculate recommendation scores for each workspace location based on a
          user’s affinity vector. The top recommended workspaces for the user
          are then determined by sorting the recommendation scores and selecting
          the highest-scoring workspaces. The details for the top recommended
          are printed to the console for the user to see.
        </p>
      </div>
      <img id="blob1" src={blob1}></img>
      <img id="blob2" src={blob2}></img>
    </>
  );
}
