// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGm1GlpPvI-XgwlDf23dF7KJkKxIj_AwE",
  authDomain: "week8-yuelu.firebaseapp.com",
  projectId: "week8-yuelu",
  storageBucket: "week8-yuelu.appspot.com",
  messagingSenderId: "788632254297",
  appId: "1:788632254297:web:80bc1fe9f246aacfa73e48"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()
export default db