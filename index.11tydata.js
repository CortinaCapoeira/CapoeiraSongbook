module.exports = {
    eleventyComputed: {
      songsOfMonth: {
        orderedMonths: data => {
          const MONTHS_TO_INCLUDE = 3;
          //filter just songs with month prop and copy obj, adding song filename
          var songsOfMonth = [];
          for(songFilename in data.songs){
            var songObj = data.songs[songFilename];
            if(songObj.songOfMonth){
              var somObj = Object.assign({filename:songFilename},songObj);
              songsOfMonth.push(somObj);
            }
          }
          //parse song of month
          for(song of songsOfMonth){
            var monthAndYear = parseSongOfMonthDate(song);
            song.somMonth = monthAndYear[0];
            song.somYear = monthAndYear[1];
          }
          //order songs by month
          songsOfMonth.sort((song1,song2) => {
            if(song1.somYear == song2.somYear){
              return song2.somMonth - song1.somMonth;
            }
            return song2.somYear - song1.somYear;
          });
          //get first x songs
          songsOfMonth = songsOfMonth.slice(0, MONTHS_TO_INCLUDE);
          //return
          return songsOfMonth;

          function parseSongOfMonthDate(song){
            var somReg=/(\d{1,2})\/(\d{4})/;
            if(!somReg.test(song.songOfMonth)){
              return null;
            }
            var monthAndYear = song.songOfMonth.match(somReg);
            monthAndYear[0] = Number.parseInt(monthAndYear[1]);
            monthAndYear[1] = Number.parseInt(monthAndYear[2]);
            return [monthAndYear[0], monthAndYear[1]];
          }
        }
      }
    }
  };
