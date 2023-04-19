#!/usr/bin/env python
# coding: utf-8

# # Smart Adaptive Recommendations (SAR) Model

# In[20]:


import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load original catalogue data
clean_df = pd.read_csv('https://raw.githubusercontent.com/Workspace-Recommendation-Engine/workspace_data/main/workspaces_clean.csv', index_col=0)
clean_df


# - The code above imports the necessary libraries and reads the cleaned workspace data file 'workspaces_clean.csv' into a Pandas DataFrame called clean_df.
# 
# - The index_col=0 parameter specifies that the first column of the CSV file should be used as the index of the DataFrame.
# 
# - The clean_df DataFrame contains pre-processed and cleaned data for the workspace recommendation engine. This includes relevant attributes for each workspace, such as location, opening time, price, and ratings, as well as any additional user and workspace information needed for the SAR model.
# 

# In[21]:


# Drop constantly changing Next_status column
clean_df.drop("Next_status", axis=1, inplace=True)


# - The code above drops Next_status column which is irrelavant as it constantly changes based on the current time.

# In[22]:


# Get 100 row indices labels following pattern:
# User_1, User_2, User_3 ... User_100
user_row_indices = []
for i in range(1, 101):
    user_row_indices.append(f"User_{i}")

# Dictionary to store weighted location ratings to add to dataframe
data = {
    "Workspace_Id": clean_df["Workspace_Id"],
    "Workspace": clean_df["Name"], # workspace locations
    "Category": clean_df["Category"]
}

# number of ratings to generate for each user
num_rows = len(clean_df)

# initialise random_seed to fixed value to always produce same results
random_seed = 2023
for row in user_row_indices:
     
    # set random seed
    np.random.seed(random_seed)
    
    # for each user, generate weights for each workspace location and add to data dictionary
    data[row] = np.random.uniform(1, 5, num_rows).round(1)
    
    # increment random seed at each iteration so that each category has different randomly generated values
    random_seed += 1

# create dataframe with weighted average for each location based on each user
weighted_clean_df = pd.DataFrame(data = data)
print("\nWeighted Average User Rating for each Workspace")
weighted_clean_df


# -Here, we generate a synthetic dataset for the SAR model, which consists of 100 users and their ratings of the workspaces in the clean_df DataFrame. The users are identified by labels in the format of "User_1" up to "User_100".
# 
# -The data dictionary is initialized to store the workspace information from the clean_df DataFrame, including the workspace ID, name, and category.
# 
# -The **num_rows** variable is set to the number of rows in the clean_df DataFrame.
# 
# -For each user, the code generates random weights for each workspace location using **np.random.uniform(1, 5, num_rows)**, which generates random floating-point numbers between 1 and 5. These weights are rounded to 1 decimal place using the **.round(1)** method. The weights are added to the data dictionary under the key of the user's label.
# 
# -The **weighted_clean_df** DataFrame is then created by passing the data dictionary to the **pd.DataFrame()** constructor. This DataFrame shows the weighted average user rating for each workspace, based on each user's randomly generated ratings.

# In[23]:


category_averages_df = weighted_clean_df.groupby("Category").mean(numeric_only=True).round(1).T
print("\nUser Average Rating for Workspace Categories")
category_averages_df


# -In this code, we calculate the average ratings for each workspace category across all users, using the **groupby()** method on the weighted_clean_df DataFrame. The groupby() method groups the rows in the DataFrame by the "Category" column, and the **.mean()** method calculates the mean of the ratings for each category. The resulting DataFrame has the category names as the index and the mean ratings as the columns.
# 
# -Then, the **.T** method is called to transpose the DataFrame, so that the categories are now the columns and the mean ratings are the rows.
# 
# -Finally, we print the **category_averages_df** , which shows the user average rating for each workspace category based on the synthetic dataset generated in the previous code.

# In[24]:


# Drop Workspace_Id row
category_averages_df.drop("Workspace_Id", axis=0, inplace=True)
category_averages_df


# - Here, we drop the "Workspace_Id" row from the category_averages_df DataFrame using the **drop()** method, which removes the specified row or column from the DataFrame. The **axis=0** parameter specifies that the row should be dropped, and the **inplace=True** parameter ensures that the DataFrame is modified in place.
# 
# - The resulting DataFrame shows the user average rating for each workspace category based on the synthetic dataset generated in the previous code block, with the "Workspace_Id" row removed.

# In[25]:


# Copy clean_df in a dataframe called relevant_train_df
# relevant_train_df will be store only useful features to compare workspaces
relevant_train_df = clean_df.copy()

# Label encode categories with rank
# This allows us to create numeric coding in alphabetical order without having to sort
# the dataframe which would rearrange the sorting of the workspace Ids
# It is important to keep the workspace Ids sorted because we will later use
relevant_train_df['Category'] = relevant_train_df['Category'].rank(method='dense').astype(int) - 1

# Reordering workspaceIds since we decided to sort the worspace_df by category to ensure alphabetic label encoding
workspace_ids = [i for i in weighted_clean_df["Workspace_Id"]]

relevant_train_df


# In[26]:


# Store irrelevant column names (those not needed for workspace to workspace comparison) in a list
irrelevant_cols = ["Name", "Review_count", "Address"]

# Drop irrelevant columns from relevant_train_df so that we are left with only
# Workspace Id, rating, price range, category, latitude and longitude
# Workspace Id will not be used in the similatity comparison but jus to identify workspaces
relevant_train_df.drop(irrelevant_cols, axis=1, inplace=True)
relevant_train_df


# - Here, we just create a dataframe called relevant_train_df which contains the workspace Id along with the rating, price range, category, latitude and longitude as we believe only these features are relevant for comparison between workspaces.
# 
# - <b>It is important to note that the workspace Id will not be taken into account for the actual comparisons but just to identify the workspaces being compared </b>.

# In[27]:


# Get indices and columns for workspaces which correspond to the workspace Ids
workspace_ids = [i for i in weighted_clean_df["Workspace_Id"]]

# Get data which is cosine similarity between each workspace based on rating, price_range, category, latitude and longitude
data = cosine_similarity(relevant_train_df.iloc[:, 1:], relevant_train_df.iloc[:, 1:])

# Create and display workspace to workspace similarity dataframe
workspace_workspace_df = pd.DataFrame(data=data, index=workspace_ids, columns=workspace_ids)
workspace_workspace_df


# -Here, we create **a workspace to workspace affinity matrix** based on the synthetic dataset generated in the previous code block:
# 
# 1. First, a list of workspace IDs is created by selecting the "Workspace_Id" column from the weighted_clean_df DataFrame.
# 
# 2. We store the cosine similarity between two instances of the relevant train data (excluding the workspace Id) and store this as variable called data.
# 
# 3. We create a dataframe called workspace_workspace_df with the data we created in the previous step and the indices and columns corresponding to the workspace Ids. This dataframe acts as a workspace to workspace affinitiy matrix which measures the cosine similarity between each workspace based on rating, price range, category, latitude and longitude.

# In[28]:


# Recommendation scores are obtained by multiplying the workspace-to-workspace affinity matrix
# by the User_1 affinity vector
rec_scores = workspace_workspace_df.values.dot(weighted_clean_df["User_1"].values)

# Get data_frame for User_1 Workspace recommendation scores (descending order)
# Index equates to the workspace Id for each workspace
data = {"User_1_Recommendations": rec_scores}
user_1_rec = pd.DataFrame(data=data, index=workspace_workspace_df.index)
user_1_rec.sort_values("User_1_Recommendations", ascending=False, inplace=True)
user_1_rec


# Here, we calculate the recommendation scores for each workspace for the hypothetical user "User_1". We use the workspace to workspace affinity matrix (workspace_workspace_df) and the affinity vector for "User_1" **(weighted_clean_df["User_1"])** generated in the code blocks prior:
# 
# 1. The first line of the code calculates the recommendation scores by performing a **dot product between the workspace-to-workspace affinity matrix** (workspace_workspace_df.values) and the User_1 affinity vector (weighted_clean_df["User_1"].values).
# 
# 2. The resulting recommendation scores are then added to a new DataFrame called **user_1_rec** with the column name **"User_1_Recommendations"**. The index of the DataFrame corresponds to the workspace IDs, and the cells represent the recommendation scores for each workspace.
# 
# 3. Finally, the user_1_rec DataFrame is sorted **in descending order** based on the recommendation scores. 
# 
# The resulting DataFrame shows the recommended workspaces for User_1, with the top recommended workspace at the top of the DataFrame.

# Print Recommendations

# In[29]:


# Get sub-dataframe with top 5 scored workspaces
top_5_workspaces = user_1_rec.head(5)
print("\nTop 5 Workspaces for User 1")
top_5_workspaces


# Here, we extract the top 5 recommended workspaces for "User_1" from the user_1_rec DataFrame generated in the previous code block. We create a new DataFrame called **top_5_workspaces** that contains the top 5 recommended workspaces with their corresponding recommendation scores.
# 
# The **head(5)** method is used to extract the first 5 rows (i.e., the top 5 recommended workspaces) of the user_1_rec DataFrame. 
# 
# The resulting top_5_workspaces DataFrame is printed.

# In[30]:


def print_workspace(workspace_id):
    # Get workspace row based on id
    workspace = clean_df[clean_df["Workspace_Id"] == workspace_id]
    
    # Get price range string based on category codes
    price_range_cat = workspace["Price_range"].values[0]
    if(price_range_cat == 0):
        price_range = None
    elif(price_range_cat == 1):
        price_range = "€"
    elif(price_range_cat == 2):
        price_range = "€€"
    elif(price_range_cat == 3):
        price_range = "€€€"
    
    # Print workspace details
    print(workspace["Name"].values[0])
    print(workspace["Address"].values[0])
    print(workspace["Category"].values[0])
    if price_range is not None:
      print(f"Price range: {price_range}")
    print(f"Overall Rating: {workspace['Rating'].values[0]}")  


# Here, we define a function called **print_workspace** that takes a **workspace_id** as an input parameter.
# 
# The function first retrieves the row in the clean_df dataframe that corresponds to the given workspace id. It then extracts the details about the workspace such as **its name, address, category, price range and overall rating**, and prints them out to the console in a structured format.
# 
# The function is meant to be used to display details of a workspace to a user, given a workspace id.

# In[31]:


# Print top 5 recommended workspaces for User_1

print("\nWorkspace Recommendations for User 1\n")

# Initialise to make top 5 count
top = 0

# Get index/workspace Id of each top 5 workspace
for i in top_5_workspaces.index:
    top += 1
    # Print details for each top choice
    print(f"Top {top} Choice\n")
    print_workspace(i)
    print("\n\n")

