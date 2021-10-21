const form = document.getElementById("textInputForm");
const resultsList = document.getElementById("resultsList");
const enVrac = document.getElementById('enVrac');
const filterFrenchCommon = [
  "de",
  "la",
  "à",
  "les",
  "des",
  "et",
  "",
  "le",
  "du",
  "en",
  "que",
  "une",
  "dans",
  "un",
  "pas",
  "qui",
  "comme",
  "par",
  "a",
  "ce",
  "au",
  "ne",
  "ou",
  "aux",
  "se",
];

const compare = (a, b) => {
  return count[b] - count[a];
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.textInput.value) {

    resetAll();

    text = `${form.textInput.value}`;

    extractWords(text);
    sortByCount();
    displayResults(form.minchars.value, form.minoccurrence.value);
  }
});

let count = {};
let words;
let uniqueWords;

const resetAll = () => {
  count = {};
  words = [];
  uniqueWords = [];
  resultsList.innerHTML = '';
  enVrac.innerHTML = '';
}

// Extract single words and count them inside an object
const extractWords = (item) => {
  itemCleaned = item.replaceAll(/[!@#$%^–&*(),.?":;{}|<>«»\t\n\r]/g, "");
  words = itemCleaned.split(" ");
  words.forEach((word) => {
    if (!count[word]) {
      count[word] = 1;
    } else {
      count[word] += 1;
    }
  });

  uniqueWords = [...new Set(words)];
};

const sortByCount = () => {
  uniqueWords.sort(compare);
};

const displayResults = (minchars = 3, minoccurrence = 2) => {
  console.log(minchars + " " + minoccurrence);
  uniqueWords.forEach((word) => {
    if (
      !filterFrenchCommon.includes(word.toLowerCase()) &&
      word.length >= minchars &&
      count[word] >= minoccurrence
    ) {
      const li = document.createElement("LI");
      li.innerHTML = `${word} : <span>${count[word]}</span>`;
      resultsList.appendChild(li);
      enVrac.textContent += word + " ";
    }
  });
};
