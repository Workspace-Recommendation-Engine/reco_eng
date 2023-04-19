#!/usr/bin/env python
# coding: utf-8

# # KNN Model

# In[95]:


import pandas as pd
import numpy as np

clean_df = pd.read_csv('https://raw.githubusercontent.com/Workspace-Recommendation-Engine/workspace_data/main/workspaces_clean.csv', index_col=0)


# In[96]:


clean_df


# First, we need to work with our category column so that we can get the cosine similarity from it. To do this, we can perform some one hot encoding on this variable so that it is binned in binary values. In other words, this will create a unique binary array for each category so that they can be identified numerically.

# In[97]:


categoryList = []
for index, row in clean_df.iterrows():
    categories = row["Category"]
    
    for category in categories:
        if category not in categoryList:
            categoryList.append(category)


# In[98]:


def binary(category_list):
    binaryList = []
    
    for category in categoryList:
        if category in category_list:
            binaryList.append(1)
        else:
            binaryList.append(0)
    
    return binaryList


# In[99]:


clean_df['category_bin'] = clean_df['Category'].apply(lambda x: binary(x))
clean_df['category_bin'].head()


# In[100]:


clean_df.head()


# Now we create a function to get the cosine similaity based on any two given categories that are passed in.

# In[101]:


from scipy import spatial

def similarity(workspaceId1, workspaceId2):
    a = clean_df.iloc[workspaceId1]
    b = clean_df.iloc[workspaceId2]
    
    categoryA = a['category_bin']
    categoryB = b['category_bin']
    
    categoryDistance = spatial.distance.cosine(categoryA, categoryB)
    
    return categoryDistance 


# Now for the final step, which is implementing a score predictor. This will hinge upon the similarity function we just built to analyze the k-nearest neighbors. Here's how it works:
# 
# The first thing it does is ask the user to enter a location. This could be a previous location they particularly enjoyed. Then, we get the k-nearest neighbors based on the cosine similarity of each cateogry corresponding to each neighboring workspace. We then rank the list of recommendations based on their cosine similarity score and print the result which includes the name of the location as well as the star rating it has on Google Maps.

# In[102]:


import operator

def predict_score():
    #name = input('Enter a location: ')
    name = "Harina"
    new_location = clean_df[clean_df['Name'].str.contains(name)].iloc[0].to_frame().T
    print('Selected Location: ',new_location.Name.values[0])

    def getNeighbors(baseLocation, K):
        distances = []
    
        for index, location in clean_df.iterrows():
            if location['Workspace_Id'] != baseLocation['Workspace_Id'].values[0]:
                dist = similarity(baseLocation['Workspace_Id'].values[0], location['Workspace_Id'])
                distances.append((location['Workspace_Id'], dist))
    
        distances.sort(key=operator.itemgetter(1))
        neighbors = []
    
        for x in range(K):
            neighbors.append(distances[x])
        return neighbors
    
    K = 10
    neighbors = getNeighbors(new_location, K)
    print('\nRecommended Workspaces: \n')
    for neighbor in neighbors: 
        print( "Index: ", clean_df.iloc[neighbor[0]][0], "\nName: ",str(clean_df.iloc[neighbor[0]][1]).strip('[]'), "\nRating: ", str(clean_df.iloc[neighbor[0]][2]) )
    


# In[103]:


predict_score()

