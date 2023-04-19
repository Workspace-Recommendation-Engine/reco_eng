# AI Chatbots and Recommendation Systems Semester Project 

## Final Release
For the final release of this project, we attempted to follow the general file structure as outlined in this repo provided by the professor https://github.com/miguelgfierro/project_template/releases/tag/0.1.0.

Team communication was primarily conducted over WhatsApp, however we left essential interactions under Issues and Discussions. 

The Figma mockup of our frontend design can be found here: https://www.figma.com/files/team/1213434573888216283/Workspace-Reco?fuid=988727842074551615 

We will break down the documentation based on each subdirectory:

## .github/workflows
This is where our workflows file goes. Here, we have automated a GitHub workflow to automatically execute a PR gate and then run all the pytests.

## examples/models
This is the subdirectory where our core models go. We attempted the project with two different models - SAR and KNN. In the end, we chose the SAR model as we were able to resolve the hot start problem with that but did not have the time to properly solve the cold start problem in the KNN model (more on this in the elaboration on the model itself).

### SAR Model

The Smart Adaptive Recommendation (SAR) model works as follows:
  - Clean and label encode all workspace features that would be useful for comparison. In this case, we used rating, price range category, latitude and longitude. We obtained a workspace to workspace affintiy matrix by applying cosine similarity to two instances of these features.
  - Accept a user affinity matrix vector with a weight/rating that corresponds to each workspace for a particular user.
  - Obtain recommendation score for each workspace by multiplying the workspace to workspace affinity matrix by the user affinity vector, sorting the resulting vector in descending order in order to extract the top 5 to 10 workspaces (index for each score corresponds to a workspace ID).
  - Pass the top IDs to a function called print_workspace to output the details (name, address, workspace category, average rating) for the top recommended workspaces for a user.

### KNN Model
For this model, we take the clean dataset and do some one-hot encoding on the categories column to get unique binary arrays for each category. This then allows us to run cosine similarity on different categories, which gets passed into our final ranking function. This ranking function works by taking a given location as input and then giving an output based on the KNN approach with cosine similarity. The problem with this is that we had a cold-start problem in which we would need to multiply the weights of different categories by the preferences indicated by a user. We almost implemented this solution, however we would have also needed to implement something to take the user's location into account. Unfortunately, by the time we realized this, we were already quite close to the deadline so we didn't have the time to do the research and tweaking necessary for that solution. 


## reco_eng_app
The reco_eng_app folder holds the frontend of the project. The files that add the most major functionality to the application include, categoryVector.js file where the coldstart and hotstart problem is accounted for. In this file a fetch request is made to the server and the users top 10 workspaces are acquired. Additionally, in the the matchesVector.js file we were able to write a function that updates the user's workspace ratings vector which can then be passedi nto the SAR model. We have the data accurately going from the server to the the frontend but unfortanately we could not get it to display. 

Here is the image of the data being accessed on frontend: 
https://drive.google.com/file/d/1aJhQfsWIquR0l_vjsWwqGxH2oXNjkpwz/view?usp=share_link

Here is the image of what it would look like when workspaces are displayed on frontend: 
https://drive.google.com/file/d/1s7GgaES9PJTaKUr3Ul2cEemfO-mrzKlW/view?usp=share_link

## tests
We ran two separate sets of testing for the SAR and KNN models. It should be noted that in order to be able to import the code from the models properly, we had to convert from ipynb to py file formats. This function is included in this subdirectory, simply for documentation purposes. There is a file in this subdirectory called requirements.txt which contains required libraries for running the tests, which are installed during the PR Gate GitHub workflow.

### SAR Tests
We test the print_workspace(id) function with the id parameteter representing a workspace ID. The test asserts that the details printed in this function correspond to the workspace details for a workspace in our dataset with that assigned ID.


### KNN Tests
We test the predict_score function by looking to see if the output is the same as the formatted output given by the function with a constant location set as the input for testing purposes. 

## setup.py
The setup file to run pytests.


# Django API

In the end we went with the SAR model to connect with our react app. We configured a Django app to store the workspace to workspace affinity matrix in csv format, convert it to a df and then perform the matrix multiplication with a user affinity vector to get the top scores. The React app makes a POST request sending a JSON with a user affinity vector to an address as follows: http://127.0.0.1:8000/get_recommendations/ 

The sent JSON is formatted as follows:

{"WorkspaceRatingsVector":[2.3,4.6,3.4,1.5,1.6,2.9,1.1,3.9,3.1,3.2,2.8,3.0,2.6,1.6,2.4,1.6,2.4,1.7,2.6,1.1,3.3,1.8,2.3,2.5,1.7,1.4,2.8,1.8,2.5,4.7,4.0,4.1,3.4,4.2,4.2,4.9,4.5,1.4,4.3,2.2,2.0,2.6,3.2,3.5,1.3,4.9,2.6,3.9,3.7,1.9,1.7,3.9,4.5,2.6,1.4,4.7,2.4,2.7,1.7,3.3,4.4,4.2,1.4,4.7,3.0,2.5,2.9,3.1,5.0,4.0,2.5,3.4,2.7,1.4,3.1,2.4,1.1,3.4,4.7,2.1,4.3,3.2,1.1,2.4,3.2,1.1,3.9,1.8,4.0,3.5,2.4,3.5,3.1,4.6,3.1,3.4,2.9,3.8,1.5,3.9,4.5,3.1,3.7,2.7,4.9,2.5,3.5,2.0,3.7,4.5,2.0,1.6,4.3,2.9,2.4,4.7,2.8,3.0,1.2,1.5,3.2,1.2,2.2,2.5,3.4,4.3,1.7,4.1,2.2,4.1,4.7,1.9,5.0,2.2,4.5,3.8,1.2,1.8,4.4,3.6,4.5,3.9,1.4,1.1,1.7,2.1,3.7,3.3,2.5,2.1,1.8,2.3,2.5,1.8,3.4,1.3,3.9,3.9,3.4,3.9,3.9,4.1,3.7,4.2,3.4,4.4,2.8,2.6,2.1,1.4,2.7,3.7,2.0,2.4,3.5,3.7,2.4,3.0,2.6,4.0,1.6,3.9,3.1,2.3,4.7,4.9,3.2,1.4,3.7,4.7,2.1,1.5,4.4,3.8,4.6,4.8,3.1,3.8,2.7,4.5,3.6,1.4,2.2,2.2,2.3,1.5,3.4,2.9,1.4,2.2,3.5,1.3,1.7,3.8,3.4,3.1,3.1,2.0,3.7,1.1,3.7,3.3,3.2,1.6,1.5,3.2,3.3,4.3,2.4,3.4,3.7,1.4,3.9,3.9,4.5,2.7,1.9,3.7,4.9,3.3,2.0,2.4,3.5,3.7,3.6,3.7,3.3,2.8,3.4,2.5,2.0,4.8,3.4,4.3,3.0,3.7,3.0,1.9,2.4,4.1,1.4,4.3,1.4,3.5]}

The API responds with a JSON response that contains an array with the top 10 recommended workspaces in the following format:
{"top_10_ids:" [172, 145, 138, 163, 128, 157, 148, 136, 168, 146]}.

From here on out, the React web app displays the top 10 recommended workspaces to the user by using these IDs as primary keys to identify the workspaces in the "workspaces" node in Firebase Realtime Database.

This API was deployed to an AWS EC2 instance.

Django API repo can be found here: https://github.com/thelearner411/django_workspace_api
