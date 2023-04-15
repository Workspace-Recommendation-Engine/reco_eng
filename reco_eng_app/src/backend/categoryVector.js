import {
  getDatabase,
  ref,
  orderByChild,
  equalTo,
  onValue,
  set,
  push
} from "firebase/database";


export const getCategoryRatingbyUser = (uid) =>{
  var vector = []; 
  const db = getDatabase();
  
  const reference = ref(db, '/categoryRatings');
  // Attach an asynchronous callback to read the data at our posts reference
  onValue(reference, (snapshot) => {
    console.log(snapshot.val());
    snapshot.forEach(element => {
      var rating = element.val().rating;
      var categoryID = element.val().categoryID;
      console.log("rating: " + rating);
      vector.push(rating);    
    });
    vector.map((item, i) => {
      console.log("item at index: " + i + " " + item)
    })

  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });

  console.log("vector in get: " + vector)
  pushRatingVector(vector, uid)
  // return vector;
}


const pushRatingVector = (categoryVector, uid) => {
  const db = getDatabase(); 

  //!pretty much dont need this 
  console.log("vector in push function: " + categoryVector)
  const vectorObject = {};
  for (let i = 0; i < categoryVector.length; i++) {
    vectorObject[`categoryID_${i}`] = categoryVector[i];
  }
  const vectorsRef = set(ref(db, 'vectors/' + uid), {
     ratingsVector: vectorObject
  });
  //!to this 

  const workspaceVectorObject = {};
  const reference = ref(db, '/workspaces');
  onValue(reference, (snapshot) => {
    // console.log("this should print out all of the workspaces: " + snapshot.val()); all of the workspaces make it here 
    var i = 0;
    console.log("new snapshot log: " + snapshot)
    snapshot.forEach((element) => { 
      console.log("workspace element: " + JSON.stringify(element.val()) + " index: " + i)
      console.log("category id: " + element.val().category_id)
      var categoryID = element.val().category_id; //each workspace's categoryID 
      var targetRating = categoryVector[categoryID]; //checking category vector and getting appropriate rating 
      workspaceVectorObject[`${i}`] = targetRating; //set workspace[i] = with value of target rating
      i+=1;
    });
    set(ref(db, 'workspaceRatings/' + uid), {
      workspaceRatingsVector: workspaceVectorObject
   });
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}


