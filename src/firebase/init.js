// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgDxh32rGG8dRi1P2CZNLRm0WENiq1P8M",
  authDomain: "week7-yuelu.firebaseapp.com",
  projectId: "week7-yuelu",
  storageBucket: "week7-yuelu.appspot.com",
  messagingSenderId: "715540593062",
  appId: "1:715540593062:web:10520b312f4588874ef767"
};

// Initialize Firebase
initializeApp(firebaseConfig); 

const db = getFirestore()
export default db