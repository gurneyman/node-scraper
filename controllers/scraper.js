const scraperService = require('../services/scraperService');

const scraper = {};

scraper.getScraper = (req, res) => {
    res.render('scrape', {title: 'Scrape Results'});
};

scraper.getImdbInfo = (req, res) => {
    let url,
        json;
    if(req && req.body && req.body.url) {
        url = req.body.url;
    } else {
        res.render('scrape', {title: 'Scrape Results'});
    }
    scraperService.getMovieInfo(url, (err, val) => {
        if(val){
            res.render('scrape', {title: 'Scrape Results', json: val});
        } else{
            res.sendStatus(404);
        }
    });
};

module.exports = scraper;