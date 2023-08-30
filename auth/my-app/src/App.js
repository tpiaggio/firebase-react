import { useState, useEffect } from "react";
import app from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const auth = getAuth(app);

function App() {
  const [signedIn, setSignedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setSignedIn(!!user);
    });
  }, []);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {!loading && (signedIn ? <Home /> : <Auth />)}
    </div>
  );
}

export default App;
