import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB1FViG_LQhsw4MZuTZK2lnAE3QgJrJmh0",
  authDomain: "simple-todoapp-d5eeb.firebaseapp.com",
  projectId: "simple-todoapp-d5eeb",
  storageBucket: "simple-todoapp-d5eeb.appspot.com",
  messagingSenderId: "783137326067",
  appId: "1:783137326067:web:107d0fc27db16adc970886",
  measurementId: "G-QL5SMG2CDB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const database = firebase.database();

export default firebase;
