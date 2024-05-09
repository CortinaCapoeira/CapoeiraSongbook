import { parseSongFileContent } from './parse-song-content.mjs';


const HULIPAA_SEARCH_SEARCHBAR_SELECTOR = '.hulipaa_searchbar form input'
const HULIPAA_SEARCH_FORM_SELECTOR = '.hulipaa_searchbar form'
const HULIPAA_SEARCH_RESULT = '.hulipaa_searchbar .result-div'
export function loadSearch(searchResultsOutputUrlPath) {
  window.addEventListener('DOMContentLoaded',() => {
    Hulipaa({
      parsePage: parseSongFileContent,
      resultsPath: searchResultsOutputUrlPath
    })

    const searchbar = document.querySelector(HULIPAA_SEARCH_SEARCHBAR_SELECTOR)
    const searchForm = document.querySelector(HULIPAA_SEARCH_FORM_SELECTOR)

    // TODO when hulipaa will support this, use hulipaa to run this code
    searchbar.addEventListener('input',(event) => {

      // This is to automatically empty results when the user deletes all the text in the searchbox
      if (event?.target?.value == '' && hasBeenAlreadySearched()) {
        searchForm.requestSubmit()
      }
    })
  });
}

function hasBeenAlreadySearched() {
  return document.querySelector(HULIPAA_SEARCH_RESULT) != null
}