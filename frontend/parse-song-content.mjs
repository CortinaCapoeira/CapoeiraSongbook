
export function parseSongFileContent(fileContent) {
  const songObject = JSON.parse(fileContent)
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
