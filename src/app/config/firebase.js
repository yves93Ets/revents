import firebase from "firebase";

import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAvK5R-R5bhVPXrr4caqqrwV14chB8_2Fs",
  authDomain: "revents-d3dc7.firebaseapp.com",
  databaseURL: "https://revents-d3dc7.firebaseio.com",
  projectId: "revents-d3dc7",
  storageBucket: "revents-d3dc7.appspot.com",
  messagingSenderId: "267391491503"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
