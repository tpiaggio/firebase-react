// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc2DN7vfPbYgn-s-W4SOTeh3cpr4niCDs",
  authDomain: "serverless-2023.firebaseapp.com",
  databaseURL: "https://serverless-2023-default-rtdb.firebaseio.com",
  projectId: "serverless-2023",
  storageBucket: "serverless-2023.appspot.com",
  messagingSenderId: "1072170437491",
  appId: "1:1072170437491:web:771354abc2d25345101306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
