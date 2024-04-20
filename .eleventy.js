const scrollybox = require('./scrollybox.js')
const generateSearchResults = require('./generate-search-results.js')

const WEBSITE_PATH_PREFIX = "CapoeiraSongbook"
const DEPLOYED_SONG_DATA_FOLDER = "song-data"
const SEARCH_RESULTS_OUTPUT_FOLDER = 'search-index'
module.exports = function (eleventyConfig) {
    eleventyConfig.on("eleventy.before",async ({ dir,runMode,outputMode }) => {
        generateSearchResults(
            SEARCH_RESULTS_OUTPUT_FOLDER,
            DEPLOYED_SONG_DATA_FOLDER,
            WEBSITE_PATH_PREFIX)
    });

    // Output directory: _site

    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("img");

    // Copy `css` to `_site/css`
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("css");

    // Copy `frontend` to `_site/frontend`
    eleventyConfig.addPassthroughCopy("frontend");

    // Copy data of songs to folder in deployed website
    // So would copy "_data/songs" into "_site/song-data"
    eleventyConfig.addPassthroughCopy({ "_data/songs": DEPLOYED_SONG_DATA_FOLDER });

    // Copy generated index of the search results done by hulipaa
    eleventyConfig.addPassthroughCopy(SEARCH_RESULTS_OUTPUT_FOLDER);

    eleventyConfig.addShortcode("monthName",function (monthNumber) {
        monthNumber = parseInt(monthNumber);
        //needed just to get a date, year and day not really needed
        const dateMonth = new Date(2021,monthNumber - 1,1); //month number -1 because it is 0 based in a Date constructor
        return dateMonth.toLocaleString('en-GB',{ month: 'long' });
    });

    eleventyConfig.addFilter("format_date",function (value) { return value.toLocaleDateString('en-GB') });

    return {
        pathPrefix: WEBSITE_PATH_PREFIX
    };
};
