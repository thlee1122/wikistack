'use strict'

var express = require("express");
var app = express();
var router = express.Router();
module.exports = router;

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {
	res.redirect('/');
	//res.send('got to Get /wiki/');
});


router.post('/', function(req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	// var url = urlTitleGenerator(title);

	var page = Page.build({
		title: title,
		content: content
	});
	
	//res.json(req.body);
	page.save()
	
	.then(function(page) {
		res.json(page);
	});
});

// var urlTitleGenerator = function(title) {
// 	if(title) {
// 		return title.replace(/\s+/g, '_').replace(/\W/g, '');
// 	} else {
// 		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
// 	}
// }

router.get('/add', function(req, res, next) {
	res.render('addPage');
});


router.get('/:urlTitle', function(req, res, next) {
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(foundPage) {
		res.render('wikipage', {title: req.body.title, content: req.body.content});
	})

	.catch(next);

	// var urlTitle = req.params.urlTitle;
	// res.send(urlTitle);
});
