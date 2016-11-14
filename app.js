'use strict'

var express = require("express");
var app = express();
var wikiRouter = require("./routes/wiki.js");
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models');

nunjucks.configure('views', {noCache:true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('/public'));

app.use('/wiki', wikiRouter);

models.User.sync() //'force: true' will re-run the define tables when the new columns are added or modified
.then(function () {
    return models.Page.sync()
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

// app.listen(8080, function() {
// 	console.log("listening on port 8080");
// })


