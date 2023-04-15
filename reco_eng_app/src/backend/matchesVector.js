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