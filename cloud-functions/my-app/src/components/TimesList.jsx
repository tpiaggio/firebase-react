import {useEffect, useState} from "react";
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
import {getAuth} from "firebase/auth";
import {getStorage, ref, deleteObject} from "firebase/storage";

const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const DEFAULT_IMAGE =
  "https://icons-for-free.com/iconfiles/png/512/clock+minute+time+timer+watch+icon-1320086045717163975.png";

const TimesList = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const timesQuery = query(
      collection(database, "times"),
      where("user_id", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(timesQuery, (snapshot) => {
      if (!snapshot.docs.length) {
        setTimes([]);
        return;
      }
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

  const handleDelete = async (id, image_path) => {
    await deleteDoc(doc(database, "times", id)).then(() => {
      const imageRef = ref(storage, image_path);
      return deleteObject(imageRef);
    });
  };

  return (
    <div>
      <h2>Times List</h2>
      <ol>
        {times.map((time) => (
          <li key={time.id}>
            <div className="time-entry">
              <span>
                <img
                  height="50"
                  width="50"
                  src={time.image_url || DEFAULT_IMAGE}
                />
              </span>
              <span>{time.title}</span>
              <code className="time">{time.time_seconds}</code>
              <button onClick={() => handleDelete(time.id, time.image_path)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TimesList;
