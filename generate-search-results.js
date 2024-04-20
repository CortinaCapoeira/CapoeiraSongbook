const path = require('path');
const slugify = require('@sindresorhus/slugify');
const Hulipaa = require('hulipaa')

function generateSearchResults(searchResultsOutputFolder,deployedSongDataFolder,websitePathPrefix) {
  Hulipaa({
    inputFolder: '_data/songs',
    parseData: function (fileContent,filePath) {
      const fileName = path.basename(filePath)
      let songDataDeployedPath = path.join(deployedSongDataFolder,fileName)
      if (websitePathPrefix) {
        songDataDeployedPath = path.join(websitePathPrefix,songDataDeployedPath)
      }
      songDataDeployedPath = makeAbsolutePath(songDataDeployedPath)

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

      let link = `/song/${pageNameInUrl}.html`
      if (websitePathPrefix) {
        link = websitePathPrefix + link
      }
      return makeAbsolutePath(link)
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

function makeAbsolutePath(aPath) {
  if (aPath[0] == '/')
    return aPath
  else
    return '/' + aPath
}


module.exports = generateSearchResults
