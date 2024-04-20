const scrollybox = require('./scrollybox.js')
const generateSearchResults = require('./generate-search-results.js')

const WEBSITE_PATH_PREFIX = "CapoeiraSongbook"
const DEPLOYED_SONG_DATA_FOLDER = "song-data"
const SEARCH_RESULTS_OUTPUT_FOLDER = 'search-index'
module.exports = function (eleventyConfig) {
    // Output directory: _site

    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("img");

    // Copy `css` to `_site/css`
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("css");

    // Copy `frontend` to `_site/frontend`
    eleventyConfig.addPassthroughCopy("frontend");

    // TODO will need to add passthrough for "DEPLOYED_SONG_DATA_FOLDER" (to allow hulipaa to access the json of the songs)

    // Copy generated index of the search results done by hulipaa
    eleventyConfig.addPassthroughCopy(SEARCH_RESULTS_OUTPUT_FOLDER);

    eleventyConfig.addShortcode("monthName",function (monthNumber) {
        monthNumber = parseInt(monthNumber);
        //needed just to get a date, year and day not really needed
        const dateMonth = new Date(2021,monthNumber - 1,1); //month number -1 because it is 0 based in a Date constructor
        return dateMonth.toLocaleString('en-GB',{ month: 'long' });
    });

    eleventyConfig.addFilter("format_date",function (value) { return value.toLocaleDateString('en-GB') });

    eleventyConfig.on("eleventy.before",async ({ dir,runMode,outputMode }) => {
        generateSearchResults(
            SEARCH_RESULTS_OUTPUT_FOLDER,
            DEPLOYED_SONG_DATA_FOLDER,
            WEBSITE_PATH_PREFIX)
    });
    // TODO somewhere will need to copy _data/song to passthough folder "DEPLOYED_SONG_DATA_FOLDER" (to allow hulipaa to access the json of the songs)

    return {
        pathPrefix: WEBSITE_PATH_PREFIX
    };
};
