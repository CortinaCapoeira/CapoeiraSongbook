const path = require('path');
const slugify = require('@sindresorhus/slugify');
const Hulipaa = require('hulipaa')

function generateSearchResults(searchResultsOutputFolder,deployedSongDataFolder) {
  Hulipaa({
    inputFolder: '_data/songs',
    parseData: function (fileContent,filePath) {
      const fileName = path.basename(filePath)
      // TODO will need to add pathPrefix
      const songDataDeployedPath = path.join(deployedSongDataFolder,fileName)

      const parsedFile = JSON.parse(fileContent)
      const extractedProps = parseSongObject(parsedFile)

      return {
        text: extractedProps.text,
        title: extractedProps.title,
        path: songDataDeployedPath

      }
    },
    generateLink: function (fileName,inputFolder) {
      const nameWithoutExtension = path.parse(fileName).name
      const pageNameInUrl = slugify(nameWithoutExtension)
      // TODO will need to add pathPrefix
      return `/song/${pageNameInUrl}.html`
    },
    outputFolder: searchResultsOutputFolder
  })
}

function parseSongObject(songObject) {
  return {
    text: getSongText(songObject),
    title: songObject.title,
  }
}

const LINE_SEPARATOR = '\n'
const SONG_SEPARATOR = '\n'
function getSongText(songObject) {
  return getEnglishSongText(songObject) + SONG_SEPARATOR + getBrazilianSongText(songObject)
}

function getEnglishSongText(songObject) {
  const fullEngText = getSongTextByLang(songObject,"en")
  return fullEngText
}

function getBrazilianSongText(songObject) {
  const fullBrText = getSongTextByLang(songObject,"br")
  return fullBrText
}

function getSongTextByLang(songObject,langPropertyName) {
  const lines = songObject.lines.map((line) => line[langPropertyName].trim())
  const fullText = lines.join(LINE_SEPARATOR)
  return fullText
}


module.exports = generateSearchResults
