const express = require("express");
const app = express();
const publicRouter = require('./server/routes/publicRouter');
const error404 = require('./server/middleware/error404');
const logger = require('./server/middleware/logger');
const path = require("path");
const cors = require('cors');
const clientUrl = 'http://localhost:8083';
const favicon = require('serve-favicon');

const isProd = process.env.NODE_ENV === 'production';

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/public/views'));
app.use('/public', express.static(__dirname + '/public'))
app.use(favicon(path.join(__dirname, './client/media/favicon', 'favicon.ico')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}));

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', clientUrl);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

if (!isProd) app.use(logger)
app.use('/', publicRouter)
app.use(error404);


app.listen(3000)