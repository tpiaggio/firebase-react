import {onRequest, onCall, HttpsError} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {setGlobalOptions} from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import sanitize from "./sanitize";

setGlobalOptions({maxInstances: 10});
initializeApp();

export const addExternalMessage = onRequest(async (request, response) => {
  const original = request.query.text as string;
  const sanitized = sanitize(original);

  const writeResult = await getFirestore()
    .collection("messages")
    .add({text: sanitized});

  response.json({result: `Message with ID: ${writeResult.id} added.`});
});

export const addMessage = onCall(async (request) => {
  const text = request.data.text;

  if (!(typeof text === "string") || text.length === 0) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError(
      "invalid-argument",
      "The function must be called " +
        "with one arguments 'text' containing the message text to add."
    );
  }

  // Checking that the user is authenticated.
  if (!request.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  const uid = request.auth.uid;
  const name = request.auth.token.name || null;
  const picture = request.auth.token.picture || null;
  const email = request.auth.token.email || null;
  const sanitized = sanitize(text);

  await getFirestore()
    .collection("messages")
    .add({text: sanitized, author: {uid, name, picture, email}});
  logger.info("New message written");
  return {text: sanitized};
});

export const makeUpperCase = onDocumentCreated(
  "/times/{documentId}",
  (event) => {
    const title = event.data?.data().title as string;

    logger.log("Uppercasing", event.params.documentId, title);

    const uppercase =
      title.length > 0 ? [...title][0].toUpperCase() + title.slice(1) : title;
    return event.data?.ref.set({title: uppercase}, {merge: true});
  }
);
