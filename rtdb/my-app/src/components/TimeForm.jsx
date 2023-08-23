import { useState } from 'react';
import app from '../firebase';
import { getDatabase, ref, push } from "firebase/database";

const database = getDatabase(app);

const TimeForm = () => {
    const [title, setTitle] = useState();
    const [time, setTime] = useState();

    const handleSubmit = e => {
        e.preventDefault();

        push(ref(database, 'times'), {
          title: title,
          time_seconds: parseInt(time)
        }).then(() => {
          setTitle("");
          setTime("");
        }).catch((e) => {
          console.log(e);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Add Time Entry</h4>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)} />
            </div>
            <div>
                <label>Time</label>
                <input type="number" value={time} onChange={e => setTime(e.currentTarget.value)} />
            </div>
            <button>Add Time Entry</button>
        </form>
    )
};

export default TimeForm;
