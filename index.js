function getText() {
  /** @type {HTMLTextAreaElement} */
  const element = document.getElementById("textarea");

  return element.value;
}

/**
 * @typedef {'word' | 'line' | 'char'} unit
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

document.getElementById("textarea")?.addEventListener("input", () => {
  const text = getText();

  setCount("char", countChars(text));
  setCount("word", countWords(text));
  setCount("line", countLines(text));
});
