import {initializeApp} from "firebase/app";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import {getStorage, connectStorageEmulator} from "firebase/storage";
import {getFunctions, connectFunctionsEmulator} from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc2DN7vfPbYgn-s-W4SOTeh3cpr4niCDs",
  authDomain: "serverless-2023.firebaseapp.com",
  databaseURL: "https://serverless-2023-default-rtdb.firebaseio.com",
  projectId: "serverless-2023",
  storageBucket: "serverless-2023.appspot.com",
  messagingSenderId: "1072170437491",
  appId: "1:1072170437491:web:771354abc2d25345101306",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (window.location.hostname === "localhost") {
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://localhost:9099");

  const db = getFirestore(app);
  connectFirestoreEmulator(db, "localhost", 8080);

  const storage = getStorage(app);
  connectStorageEmulator(storage, "localhost", 9199);

  const functions = getFunctions(app);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export default app;
