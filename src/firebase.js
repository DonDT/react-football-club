import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBxZ75j1Jv6PQj3Tz4BfwpKopvlUvsXDhU",
  authDomain: "m-city-87f07.firebaseapp.com",
  databaseURL: "https://m-city-87f07.firebaseio.com",
  projectId: "m-city-87f07",
  storageBucket: "m-city-87f07.firebaseio.com",
  messagingSenderId: "982320360151",
  appId: "1:982320360151:web:b9e3c8ea6671b7f8"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");

export { firebase, firebaseMatches, firebasePromotions };
