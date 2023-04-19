
# AI Chatbots and Recommendation Systems Semester Project 


## Final Release
For the final release of this project, we attempted to follow the general file structure as outlined in this repo provided by the professor https://github.com/miguelgfierro/project_template/releases/tag/0.1.0

We will break down the documentation based on each subdirectory:

## .github/workflows
This is where our workflows file goes. Here, we have automated a GitHub workflow to automatically execute a PR gate and then run all the pytests.

## examples/models
This is the subdirectory where our core models go. We attempted the project with two different models - SAR and KNN. In the end, we chose the SAR model as we were able to resolve the hot start problem with that but did not have the time to properly solve the cold start problem in the KNN model (more on this in the elaboration on the model itself).

### SAR Model

### KNN Model
For this model, we take the clean dataset and do some one-hot encoding on the categories column to get unique binary arrays for each category. This then allows us to run cosine similarity on different categories, which gets passed into our final ranking function. This ranking function works by taking a given location as input and then giving an output based on the KNN approach with cosine similarity. The problem with this is that we had a cold-start problem in which we would need to multiply the weights of different categories by the preferences indicated by a user. We almost implemented this solution, however we would have also needed to implement something to take the user's location into account. Unfortunately, by the time we realized this, we were already quite close to the deadline so we didn't have the time to do the research and tweaking necessary for that solution. 


## reco_eng_app

## tests
We ran two separate sets of testing for the SAR and KNN models. It should be noted that in order to be able to import the code from the models properly, we had to convert from ipynb to py file formats. This function is included in this subdirectory, simply for documentation purposes. There is a file in this subdirectory called requirements.txt which contains required libraries for running the tests, which are installed during the PR Gate GitHub workflow.

### SAR Tests

### KNN Tests
We test the predict_score function by looking to see if the output is the same as the formatted output given by the function with a constant location set as the input for testing purposes. 

## setup.py
The setup file to run pytests.

## Frontend Figma
https://www.figma.com/files/team/1213434573888216283/Workspace-Reco?fuid=988727842074551615 
