function getText() {
  /** @type {HTMLTextAreaElement} */
  const element = document.getElementById("textarea");

  return element.value;
}

/**
 * @param {string} string
 * @returns {string}
 **/
function capitalized(string) {
  const firstLetter = string.charAt(0).toUpperCase();
  const rest = string.slice(1);
  return firstLetter + rest;
}

/**
 * @typedef {'word' | 'line' | 'char' | 'max'} unit
 */

/**
 * @param {unit} unit
 * @param {number | string} amount
 */
function setCount(unit, amount) {
  const string = `${amount}`;

  /** @type {HTMLSpanElement} */
  const element = document.getElementById(`${unit}-count`);

  element.innerText = string;

  return `${capitalized(unit)}: ${string}`;
}

/**
 * Count the chars in the input string
 * This has no side effect
 *
 * @param {string} string
 */
function countChars(string) {
  return string.split("").length;
}

/**
 * Count the words in the input string
 * This has no side effect
 *
 * @param {string} string
 */
function countWords(string) {
  if (!string) return 0;

  const withoutMultipleSpaces = string.replace(/\s+/g, " ").trim();
  return withoutMultipleSpaces.split(" ").length;
}

/**
 * Count the lines in the input string
 * This has no side effect
 *
 * @param {string} string
 */
function countLines(string) {
  if (!string) return 0;

  return string.split("\n").length;
}

/** @param {string} string */
function getMaxLineLength(string) {
  const lineLengths = string.split("\n").map((s) => s.length);
  return Math.max(...lineLengths);
}

function setAllCounts() {
  const text = getText();

  document.querySelector('meta[property="og:title"]')?.remove();
  const meta = document.createElement("meta");
  meta.setAttribute("property", "og:title");

  setCount("char", countChars(text));
  setCount("word", countWords(text));
  setCount("line", countLines(text));
  setCount("max", getMaxLineLength(text));

  meta.setAttribute("content", `This text has ${countWords(text)} words`);

  document.head.appendChild(meta);
}

document.getElementById("textarea")?.addEventListener("input", () => {
  setAllCounts();
});

function applyUrl() {
  const url = new URL(window.location.href);
  const text = url.searchParams.get("text");
  if (!text) return;

  document.getElementById("textarea").value = text;
  setAllCounts();
}

function setUrl() {
  const text = getText();
  const url = new URL(window.location.href);
  url.searchParams.set("text", text);
  return url.toString();
}

window.addEventListener("load", () => {
  applyUrl();
});

/**
 * @typedef {object} Options
 * @property {number} timeout
 */

/**
 * @param {string} message
 * @param {Options} options
 */
function sendToast(message, options) {
  const newToast = document.createElement("div");
  const removeToast = () => newToast?.remove();

  newToast.className = "toast";
  newToast.innerText = message;
  newToast.onclick = removeToast;

  document.getElementById("toasts")?.appendChild(newToast);

  setTimeout(removeToast, options.timeout);
}

const shareButton = document.getElementById("share-btn");
shareButton?.addEventListener("click", () => {
  const url = setUrl();
  navigator.clipboard.writeText(url);
  sendToast("URL copied to clipboard", { timeout: 2000 });
});
