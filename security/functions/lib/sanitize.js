"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BadWordsFilter = require("bad-words");
const badWordsFilter = new BadWordsFilter();
/**
 * Check if contains swear words.
 * @param {string} message The message.
 * @return {boolean} The result.
 */
function containsSwearwords(message) {
    return message !== badWordsFilter.clean(message);
}
/**
 * Replace swear words.
 * @param {string} message The message.
 * @return {string} The result.
 */
function replaceSwearwords(message) {
    return badWordsFilter.clean(message);
}
/**
 * Sanitizes the text.
 * @param {string} text The text.
 * @return {string} The result.
 */
function sanitize(text) {
    if (containsSwearwords(text)) {
        console.log("User is swearing. moderating...");
        text = replaceSwearwords(text);
    }
    return text;
}
exports.default = sanitize;
//# sourceMappingURL=sanitize.js.map