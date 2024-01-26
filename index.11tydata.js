module.exports = {
  eleventyComputed: {
    songsOfMonth: {
      orderedMonths: (data) => {
        return loadHighlightSongs(data['highlighted-songs'], data.songs);
      }
    }
  }
};
const MONTHS_TO_INCLUDE = 5;

function loadHighlightSongs(highlightedSongsConfig, songs){
  const songsOfMonth = highlightedSongsConfig.songs.map(([songFilename, songOfMonthDate]) => (
    {
      title: songs[songFilename].title,
      filename: songFilename,
      songOfMonth: songOfMonthDate
    }
  ));
  songsOfMonth.forEach(populateSongDate)
  orderSongsByMonth(songsOfMonth);
  const finalSongOfMoths = songsOfMonth.slice(0, MONTHS_TO_INCLUDE);
  return finalSongOfMoths;
}


function populateSongDate(song){
  var monthAndYear = parseSongOfMonthDate(song.songOfMonth);
  song.somMonth = monthAndYear[0];
  song.somYear = monthAndYear[1];
}

function orderSongsByMonth(songsOfMonth){
  songsOfMonth.sort((song1,song2) => {
    if(song1.somYear == song2.somYear){
      return song2.somMonth - song1.somMonth;
    }
    return song2.somYear - song1.somYear;
  });
}

function parseSongOfMonthDate(songOfMonthDate){
  var somReg=/(\d{1,2})\/(\d{4})/;
  if(!somReg.test(songOfMonthDate)){
    return null;
  }
  var monthAndYear = songOfMonthDate.match(somReg);
  monthAndYear[0] = Number.parseInt(monthAndYear[1]);
  monthAndYear[1] = Number.parseInt(monthAndYear[2]);
  return [monthAndYear[0], monthAndYear[1]];
}
