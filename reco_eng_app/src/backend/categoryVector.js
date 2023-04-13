import {
  getDatabase,
  ref,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";


export const getCategoryRatingbyUser = () =>{
  const db = getDatabase();
  const reference = ref(db, '/categoryRatings');
  
  // Attach an asynchronous callback to read the data at our posts reference
  onValue(reference, (snapshot) => {
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}

