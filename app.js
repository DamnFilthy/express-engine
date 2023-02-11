const express = require("express");
const app = express();
const publicRouter = require('./routes/publicRouter')
const cors = require('cors');
const clientUrl = 'http://localhost:8083';

app.set("view engine", "ejs");

app.use('/public', express.static(__dirname + '/public'))
app.use(cors({origin: '*'}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', publicRouter)

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', clientUrl);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});


app.listen(3000)