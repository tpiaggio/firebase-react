import {useEffect, useState} from "react";
import app from "../firebase";
import {getFirestore, collection, query, onSnapshot} from "firebase/firestore";

const database = getFirestore(app);

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesQuery = query(collection(database, "messages"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      if (!snapshot.docs.length) {
        setMessages([]);
        return;
      }
      const newMessages = [];
      snapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ol>
        {messages.map((message, index) => (
          <li key={index}>
            <div className="time-entry">{message.text}</div>
            {message.author ? (
              <div>
                Author:
                <ul>
                  {message.author.name && <li>{message.author.name}</li>}
                  <li>{message.author.email}</li>
                </ul>
              </div>
            ) : (
              <p>No author</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MessagesList;
