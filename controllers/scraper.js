const cheerio = require('cheerio');
const request = require('request');

const scraper = {};

scraper.getImdbInfo = (req, res) => {
    let url = 'http://www.imdb.com/title/tt1229340/';

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

            let htmlString = "<h1>What I found</h1>";
            htmlString += "<article><h2>" + json.title + "</h2>";
            htmlString += "<p> Rating: " + json.rating + "</p>";
            htmlString += "<p> Release: " + json.release + "</p></article>";
            res.render('scrape', {title: 'Scrape Results', json: json});
        }
    });
    console.log('Running scraper');
};

module.exports = scraper;