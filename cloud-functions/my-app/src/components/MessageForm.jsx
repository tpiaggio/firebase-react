import { useState } from "react";
import app from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);
const addMessage = httpsCallable(functions, "addMessage");

const MessageForm = () => {
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    addMessage({ text: message })
      .then((result) => {
        const data = result.data;
        const sanitizedMessage = data.text;
        alert(`Message added: ${sanitizedMessage}`);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setMessage("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Message</h4>
      <div>
        <label>Text</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
      </div>
      <button>Add Message</button>
    </form>
  );
};

export default MessageForm;
