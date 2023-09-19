import {useState} from "react";
import app from "../firebase";
import {getFirestore, collection, addDoc, updateDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";

const TimeForm = () => {
  const [title, setTitle] = useState();
  const [time, setTime] = useState();
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collection(database, "times"), {
      title: title,
      time_seconds: parseInt(time),
      user_id: auth.currentUser.uid,
      image_url: file ? LOADING_IMAGE_URL : null,
    })
      .then((docRef) => {
        setTitle("");
        setTime("");
        setFile(null);
        const filePath =
          auth.currentUser.uid + "/" + docRef.id + "/" + file.name;
        const imageRef = ref(storage, filePath);
        return uploadBytes(imageRef, file).then((snapshot) => {
          return getDownloadURL(ref(storage, filePath)).then(async (url) => {
            return updateDoc(docRef, {
              image_url: url,
              image_path: (await getMetadata(imageRef)).fullPath,
            });
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Time Entry</h4>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div>
        <label>Time</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.currentTarget.value)}
        />
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button>Add Time Entry</button>
    </form>
  );
};

export default TimeForm;
