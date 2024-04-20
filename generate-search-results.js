const path = require('path');
const slugify = require('@sindresorhus/slugify');
const Hulipaa = require('hulipaa')

async function generateSearchResults(searchResultsOutputFolder,deployedSongDataFolder,websitePathPrefix) {
  const { parseSongFileContent } = await import('./frontend/parse-song-content.mjs');

  Hulipaa({
    inputFolder: '_data/songs',
    parseData: function (fileContent,filePath) {
      const fileName = path.basename(filePath)
      let songDataDeployedPath = path.join(deployedSongDataFolder,fileName)
      if (websitePathPrefix) {
        songDataDeployedPath = path.join(websitePathPrefix,songDataDeployedPath)
      }
      songDataDeployedPath = makeAbsolutePath(songDataDeployedPath)

      const extractedProps = parseSongFileContent(fileContent)

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

function makeAbsolutePath(aPath) {
  if (aPath[0] == '/')
    return aPath
  else
    return '/' + aPath
}


module.exports = {
  generateSearchResults
}
