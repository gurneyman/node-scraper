const express = require('express');
const scraper = require('../controllers/scraper');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {title: "Home"});
});

router.get('/scrape', scraper.getScraper);
router.post('/scrape', scraper.getImdbInfo);

module.exports = router;
