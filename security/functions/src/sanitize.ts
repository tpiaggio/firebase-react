import BadWordsFilter = require("bad-words");

const badWordsFilter = new BadWordsFilter();

/**
 * Check if contains swear words.
 * @param {string} message The message.
 * @return {boolean} The result.
 */
function containsSwearwords(message: string) {
  return message !== badWordsFilter.clean(message);
}

/**
 * Replace swear words.
 * @param {string} message The message.
 * @return {string} The result.
 */
function replaceSwearwords(message: string) {
  return badWordsFilter.clean(message);
}

/**
 * Sanitizes the text.
 * @param {string} text The text.
 * @return {string} The result.
 */
export default function sanitize(text: string) {
  if (containsSwearwords(text)) {
    console.log("User is swearing. moderating...");
    text = replaceSwearwords(text);
  }

  return text;
}
