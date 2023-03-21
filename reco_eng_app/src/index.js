import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC-Yil8QyThso2dcQyCVxnQz2GpbehZoEo",
  authDomain: "reco-eng.firebaseapp.com",
  databaseURL: "https://reco-eng-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reco-eng",
  storageBucket: "reco-eng.appspot.com",
  messagingSenderId: "723323357249",
  appId: "1:723323357249:web:8bcf9c83016de0c58a1ec0",
  measurementId: "G-D41NX5FLZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
