import { useDeviceLanguage } from "firebase/auth";
import {
  getDatabase,
  ref,
  orderByChild,
  equalTo,
  onValue,
  set,
  push,
  child
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
      // console.log("rating: " + rating);
      vector.push(rating);    
    });
    vector.map((item, i) => {
      // console.log("item at index: " + i + " " + item)
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
      // console.log("workspace element: " + JSON.stringify(element.val()) + " index: " + i)
      // console.log("category id: " + element.val().category_id)
      var categoryID = element.val().category_id; //each workspace's categoryID 
      var targetRating = categoryVector[categoryID]; //checking category vector and getting appropriate rating 
      workspaceVectorObject[`${i}`] = targetRating; //set workspace[i] = with value of target rating
      i+=1;
    });
    set(ref(db, 'workspaceRatings/' + uid), {
      workspaceRatingsVector: workspaceVectorObject
   });

   localWorkspaceRatings(uid);
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}


function localWorkspaceRatings (uid){ 
  const db = getDatabase();
  const vectorRef = ref(db, `workspaceRatings/${uid}/workspaceRatingsVector`);
  console.log(uid)
  onValue(vectorRef, (snapshot) => {
    const ratingsVector = snapshot.val();
    console.log("local snapshot.val(): " + snapshot.val())
    const ratingsArray = [];
  for (const key in ratingsVector) {
    ratingsArray.push(ratingsVector[key]);
  }
  console.log("ratings array!: " + ratingsArray);
  getMatches(ratingsArray)
  },(error) => {
    console.error(error);
  })
}


export const getMatches = (workspaceRatingsVector1) => {
  console.log( "looking at JSON: " + JSON.stringify({
    WorkspaceRatingsVector: workspaceRatingsVector1
  }))
  const dataArr = []
  fetch('http://127.0.0.1:8000/get_recommendations/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      WorkspaceRatingsVector: workspaceRatingsVector1
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log("data is: " + JSON.stringify(data)) //workspace ids are in here 
    dataArr.push(...data.top_10_ids)
    
  
    getTopTen(dataArr)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function getTopTen(dataArr) {
  const db = getDatabase(); 
  const reference = ref(db, '/workspaces');
  const topTen = [];
  
  for(let i = 0; i < dataArr.length; i++){
    dataArr[i] = dataArr[i].toString(); 
  }
  console.log("new data Arr is: " + dataArr[1])

  const getWorkspace = (workspaceId) => {
    return new Promise((resolve, reject) => {
      const workspaceRef = child(reference, workspaceId);
      onValue(workspaceRef, (snapshot) => {
        const workspaceObj = snapshot.val();
        if (workspaceObj) {
          resolve(workspaceObj);
        } else {
          reject(`Workspace with ID ${workspaceId} not found`);
        }
      });
    });
  };

  Promise.all(dataArr.map(getWorkspace))
    .then((workspaces) => {
      topTen.push(...workspaces);
      console.log("top Ten in array: ", topTen);
      return topTen;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

