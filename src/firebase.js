import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxZ75j1Jv6PQj3Tz4BfwpKopvlUvsXDhU",
  authDomain: "m-city-87f07.firebaseapp.com",
  databaseURL: "https://m-city-87f07.firebaseio.com",
  projectId: "m-city-87f07",
  storageBucket: "m-city-87f07.appspot.com",
  messagingSenderId: "982320360151",
  appId: "1:982320360151:web:b9e3c8ea6671b7f8"
};

//  storageBucket: "m-city-87f07.firebaseio.com",

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
};
