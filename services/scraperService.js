const cheerio = require('cheerio');
const request = require('request');

const scraperService = {}

scraperService.getMovieInfo = (url, callback) => {

    
        request(url, (error, response, html) => {
            if (!error) {
                const $ = cheerio.load(html);

                let json = {
                    title: '',
                    release: '',
                    rating: '',
                };

                const titleElement = $('.title_wrapper > h1');
                titleElement.find('*').remove();
                json.title = titleElement.text();

                const dateElement = $('meta[itemprop="datePublished"]');
                json.release = dateElement.attr('content');

                const ratingElement = $('span[itemprop="ratingValue"]');
                json.rating = ratingElement.text();
                console.log("json", json);
                callback(null, json);
            } else {
                console.log(error);
            }
        });
};
module.exports = scraperService;
