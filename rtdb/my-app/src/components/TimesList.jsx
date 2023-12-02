import {useEffect, useState} from "react";
import app from "../firebase";
import {getDatabase, ref, onValue, remove, off} from "firebase/database";

const database = getDatabase(app);

const TimesList = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const timesRef = ref(database, "times");

    onValue(timesRef, (snapshot) => {
      if (!snapshot.val()) {
        setTimes([]);
        return;
      }
      const newTimes = [];
      snapshot.forEach((child) => {
        newTimes.push({
          id: child.key,
          ...child.val(),
        });
      });
      setTimes(newTimes);
    });

    return () => off(timesRef);
  }, []);

  const handleDelete = (id) => {
    remove(ref(database, `times/${id}`));
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
