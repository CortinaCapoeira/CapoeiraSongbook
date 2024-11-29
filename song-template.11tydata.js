module.exports = {
  eleventyComputed: {
    linesWithDetails: data => {
      const songIdx = data.pagination.items[0]
      const song = data.songs[songIdx]
      //console.log(song.lines[0].br)

      detailedLines = []
      function newLine() { return { br: [], en: [] , bold: undefined} }
      function newText() { return { text: "", tooltip: undefined } }

      for(let songLine of song.lines){
        const brText = newText()
        const enText = newText()
        const singleLine = newLine()

        brText.text = songLine.br
        enText.text = songLine.en
        singleLine.br.push(brText)
        singleLine.en.push(enText)
        singleLine.bold = songLine.bold
        detailedLines.push(singleLine)
      }

      // console.log(JSON.stringify(detailedLines))
      return detailedLines
    }
    
  }
};