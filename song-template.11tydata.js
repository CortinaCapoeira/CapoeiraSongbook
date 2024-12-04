const {tooltipIdentification, emptyTextObject} = require("./tooltip-identification")

module.exports = {
  eleventyComputed: {
    linesWithDetails: data => {
      const songIdx = data.pagination.items[0]
      const song = data.songs[songIdx]
      //console.log(song.lines[0].br)

      detailedLines = []
      function newLine() { return { br: [], en: [] , bold: undefined} }

      for(let songLine of song.lines){
        const enText = emptyTextObject()
        const singleLine = newLine()

        singleLine.br = tooltipIdentification(songLine.br, song.details)

        enText.text = songLine.en
        singleLine.en.push(enText)
        singleLine.bold = songLine.bold

        detailedLines.push(singleLine)
      }

      return detailedLines
    }
    
  }
};