const { tooltipIdentification, emptyTextObject } = require("./tooltip-identification")

function getCurrentSongfromData(data) {
  const songIdx = data.pagination.items[0]
  return data.songs[songIdx]
}

function getLinesWithDetails(lines, details) {
  detailedLines = []
  function newLine() { return { br: [], en: [], bold: undefined } }

  for (let songLine of lines) {
    const enText = emptyTextObject()
    const singleLine = newLine()

    singleLine.br = tooltipIdentification(songLine.br, details)

    enText.text = songLine.en
    singleLine.en.push(enText)
    singleLine.bold = songLine.bold

    detailedLines.push(singleLine)
  }

  return detailedLines
}

function separateLanguageSections(lines) {
  function newSection(title, lines) { return { title, lines } }
  const brSection = newSection(
    'Portuguese',
    lines.map(l => ({ text: l.br, bold: l.bold }))
  )
  const enSection = newSection(
    'English',
    lines.map(l => ({ text: l.en, bold: l.bold }))
  )
  return [brSection, enSection]
}

module.exports = {
  eleventyComputed: {
    linesWithDetails: data => {
      const song = getCurrentSongfromData(data)
      return getLinesWithDetails(song.lines, song.details)
    },
    formattedMobileSections: data => {
      const song = getCurrentSongfromData(data)
      const linesWithDetails = getLinesWithDetails(song.lines, song.details)
      const sections = separateLanguageSections(linesWithDetails)
      return sections
    }
  }
};