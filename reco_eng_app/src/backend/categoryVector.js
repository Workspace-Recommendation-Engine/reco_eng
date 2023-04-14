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

const pushRatingVector = (vector, uid) => {
  const db = getDatabase(); 
  console.log("vector in push function: " + vector)
  const vectorObject = {};
  for (let i = 0; i < vector.length; i++) {
    vectorObject[`categoryID_${i}`] = vector[i];
  }

  const vectorsRef = set(ref(db, 'vectors/' + uid), {
     ratingsVector: vectorObject
  });
}


