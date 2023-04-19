import {
    getDatabase,
    ref,
    orderByChild,
    equalTo,
    onValue,
    set,
    push,
    update
  } from "firebase/database";

export const editWorkspaceRatings = (workspaceID, uid, workspaceRating) =>{
  const db = getDatabase();
  const reference = ref(db, `/workspaceRatings/${uid}/workspaceRatingsVector`);
  //update workspace rating at appropriate value 
  update(reference, {
    [`${workspaceID}`] : workspaceRating
  }).then(() => {
    console.log("Value updated successfully");
  }).catch((error) => {
    console.error("Error updating value: ", error);
  });

  //then send updated vector to api 
}

function getMatches (workspaceRatingsVector){
  fetch('http://127.0.0.1:8000/get_recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // request data here
    })
  })
  .then(response => response.json())
  .then(data => {
  // handle response data here
  })
  .catch(error => {
    console.error('Error:', error);
  });
}