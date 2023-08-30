import app from "../firebase";
import { getAuth } from "firebase/auth";

import TimeList from "../components/TimesList";
import TimeForm from "../components/TimeForm";

const auth = getAuth(app);

const Home = () => {
  return (
    <>
      <div className="header">
        <h1>Welcome to Time Tracker!</h1>
        <button onClick={() => auth.signOut()}>Sign out</button>
      </div>
      <TimeList />
      <TimeForm />
    </>
  );
};

export default Home;
