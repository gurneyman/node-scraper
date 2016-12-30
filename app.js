const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/index');

const app = express();

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', router);

app.listen(3000, () => {
	console.log('Node Scraper listening on 3000');
});