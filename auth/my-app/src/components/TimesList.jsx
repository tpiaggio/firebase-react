import { useEffect, useState } from "react";
import app from "../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const database = getFirestore(app);
const auth = getAuth(app);

const TimesList = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const timesQuery = query(
      collection(database, "times"),
      where("user_id", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(timesQuery, (snapshot) => {
      if (!snapshot.docs.length) return;
      const newTimes = [];
      snapshot.forEach((doc) => {
        newTimes.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTimes(newTimes);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    deleteDoc(doc(database, "times", id));
  };

  return (
    <div>
      <h2>Times List</h2>
      <ol>
        {times.map((time) => (
          <li key={time.id}>
            <div className="time-entry">
              {time.title}
              <code className="time">{time.time_seconds}</code>
              <button onClick={() => handleDelete(time.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TimesList;
