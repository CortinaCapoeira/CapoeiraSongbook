const SC = require("spellchecker");
const path = require("path");
const fs = require("fs");

const acceptedWordsFile = fullPathFromCurrentDir("accepted_words.txt");
const dictionaryDirectory = fullPathFromCurrentDir("dictionaries");
const songsDir = fullPathFromCurrentDir("../_data/songs");

// Create new Spell Checker
const spellchecker = new SC.Spellchecker();
spellchecker.setDictionary("pt_BR", dictionaryDirectory);

// Load the accepted works in the spell checker
{
  const acceptedWordsStr = fs.readFileSync(acceptedWordsFile, "utf8");
  const acceptedWords = acceptedWordsStr.split("\n").map((word) => word.trim());
  acceptedWords.forEach((word) => {
    spellchecker.add(word);
  });
}

forEachFileIn(songsDir, (fileContentStr, fileName) => {
  const content = parseJson(fileContentStr, fileName);

  const brazilianLines = content.lines.map((lineMultiLang) => lineMultiLang.br);

  // Run spellchecker against each line
  const errorsInLines = brazilianLines.map((line, lineNumber) => {
    const errorsIdx = spellchecker.checkSpelling(line);
    let mispelledWords = errorsIdx.map(({ start, end }) => ({
      word: line.substring(start, end),
    }));

    if (mispelledWords.length <= 0) return;

    // Load suggestions of mispelled words
    mispelledWords = mispelledWords.map((mispelledWord) => ({
      ...mispelledWord,
      suggestions: spellchecker.getCorrectionsForMisspelling(
        mispelledWord.word
      ),
    }));

    return {
      lineNum: lineNumber,
      mispelledWords,
    };
  });

  // Filter out lines with no errors
  const linesWithErrors = errorsInLines.filter((x) => x);

  if (linesWithErrors.length > 0) {
    // Print errors to console
    console.error(`Spelling mistakes found on file ${fileName}`);
    for (const line of linesWithErrors) {
      console.log(`--Line ${line.lineNum} contains following errors:`);
      for (const mispelledWord of line.mispelledWords) {
        console.log(
          `----"${mispelledWord.word}" is mispelled, possible suggestions are: ${mispelledWord.suggestions}`
        );
      }
    }

    // Return failed error code from process
    exitError();
  }
});

// ----- Functions ------

function forEachFileIn(folder, callback) {
  fs.readdir(folder, (err, files) => {
    if (err) return console.log(err);

    files.forEach((fileName) => {
      const filePath = path.join(songsDir, fileName);
      loadFileContent(filePath, (fileContent) => {
        callback(fileContent, fileName);
      });
    });
  });
}

function loadFileContent(filePath, callback) {
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    callback(data);
  });
}

function parseJson(fileContent, fileName) {
  try {
    return JSON.parse(fileContent);
  } catch (err) {
    console.error(`${fileName} is not a valid JSON`, err);
    exitError();
  }
}

function fullPathFromCurrentDir(relativePath) {
  return path.join(__dirname, relativePath);
}

function exitError() {
  process.exit(1);
}
