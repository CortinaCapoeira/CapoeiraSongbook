module.exports = function(eleventyConfig) {
    // Output directory: _site
  
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("img");
  
    // Copy `css` to `_site/css`
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("css");
    
    eleventyConfig.addShortcode("monthName", function(monthNumber) {
        monthNumber = parseInt(monthNumber);
        //needed just to get a date, year and day not really needed
        const dateMonth=new Date(2021,  monthNumber-1, 1); //month number -1 because it is 0 based in a Date constructor
        return dateMonth.toLocaleString('en-GB', { month: 'long' });
    });
    
    eleventyConfig.addFilter("format_date", function(value) { return value.toLocaleDateString() });
    
    return {
        pathPrefix: "CapoeiraSongbook"
    };
  };
