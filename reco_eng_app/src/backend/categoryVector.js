import {
  getDatabase,
  ref,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";


export const getCategoryRatingbyUser = () =>{
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

  return vector;
}



