"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpperCase = exports.addMessage = exports.addExternalMessage = void 0;
const https_1 = require("firebase-functions/v2/https");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const firestore_2 = require("firebase-functions/v2/firestore");
const v2_1 = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const sanitize_1 = require("./sanitize");
(0, v2_1.setGlobalOptions)({ maxInstances: 10 });
(0, app_1.initializeApp)();
exports.addExternalMessage = (0, https_1.onRequest)(async (request, response) => {
    const original = request.query.text;
    const sanitized = (0, sanitize_1.default)(original);
    const writeResult = await (0, firestore_1.getFirestore)()
        .collection("messages")
        .add({ text: sanitized });
    response.json({ result: `Message with ID: ${writeResult.id} added.` });
});
exports.addMessage = (0, https_1.onCall)(async (request) => {
    const text = request.data.text;
    if (!(typeof text === "string") || text.length === 0) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new https_1.HttpsError("invalid-argument", "The function must be called " +
            "with one arguments 'text' containing the message text to add.");
    }
    // Checking that the user is authenticated.
    if (!request.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new https_1.HttpsError("failed-precondition", "The function must be called while authenticated.");
    }
    const uid = request.auth.uid;
    const name = request.auth.token.name || null;
    const picture = request.auth.token.picture || null;
    const email = request.auth.token.email || null;
    const sanitized = (0, sanitize_1.default)(text);
    await (0, firestore_1.getFirestore)()
        .collection("messages")
        .add({ text: sanitized, author: { uid, name, picture, email } });
    logger.info("New message written");
    return { text: sanitized };
});
exports.makeUpperCase = (0, firestore_2.onDocumentCreated)("/times/{documentId}", (event) => {
    var _a, _b;
    const title = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data().title;
    logger.log("Uppercasing", event.params.documentId, title);
    const uppercase = title.length > 0 ? [...title][0].toUpperCase() + title.slice(1) : title;
    return (_b = event.data) === null || _b === void 0 ? void 0 : _b.ref.set({ title: uppercase }, { merge: true });
});
//# sourceMappingURL=index.js.map