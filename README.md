# reco_eng
AI Chatbots and Recommendation Systems Semester Project 


## Project Status March 2, 2023
In order to create this preliminary release of our Workspace Recommendation system, we continued to move through the steps outlined in our project proposal. Once we entered the data collection phase we began to scrape workspaces from google using Octoparse, utilizing keywords such as: “library”, “coffee shop”, “coworking space”, and “specialty cafe”. 

From this method, we were able to gather about 400 different workspace locations within Madrid. We then began to clean and analyze our data. All of the datasets were then combined (libraries, coffee shops, coworking spaces, and specialty cafes) into one large dataset. 

While one portion of our group was working on cleaning and concatenating our data the other half was checking to see which algorithm would work best for our recommendation system. Our algorithm team decided that the SAR model would be the best. Given the nature of our project and the fact that our data set is on the smaller side, we decided that an algorithm that utilizes a collaborative filtering model would provide the best results. At this point in the project, we decided to schedule a specific weekly meeting time to determine which sprint tasks needed to be completed before the next major deadline. This meeting structure allowed us to set goals to successfully prepare for this release. 

Our algorithms team worked in Google Colab to create the first version of our recommender using the SAR model and the dataset that was previously organized. With this first version of our recommender, a user is able to get their top five workspace recommendations based on a few preselected preferences.  


## Plans
- Improve user data by using GAN to make the model work more similar to a real recommendation system.
- Use new algorithms such as Light GBM, Gradient Boosting Tree, …etc and compare the performance of each algorithm.
- Build the frontend and backend of the application.
- Combine application and recommendation system.


## Frontend Figma
https://www.figma.com/files/team/1213434573888216283/Workspace-Reco?fuid=988727842074551615 
