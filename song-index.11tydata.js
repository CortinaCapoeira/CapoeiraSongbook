const constants = require('./constants.js')



module.exports = {
  eleventyComputed: {
    indexsong: {
      letterGroups: data => {
        //deep copy array and add filename to each song
        var sortedSongs = [];
        for (songFilename in data.songs) {
          var songObject = Object.assign({ filename: songFilename },data.songs[songFilename])
          sortedSongs.push(songObject);
        }
        //sort by title
        sortedSongs.sort((song1,song2) => song1.title.toUpperCase().localeCompare(song2.title.toUpperCase()));
        //group by first letter(capital)
        var letters = {};
        for (song of sortedSongs) {
          var letter = song.title[0].toUpperCase();
          //init letter
          if (letters[letter] == null) {
            letters[letter] = [];
          }
          //put song inside letter
          letters[letter].push(song);
        }
        return letters;
      },
    },
    SEARCH_RESULTS_OUTPUT_URL_PATH: '/' + constants.SEARCH_RESULTS_OUTPUT_FOLDER
  }
};