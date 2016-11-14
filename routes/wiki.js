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
	page.save().then(function(page) {
		res.redirect(page.route);
	}).catch(next);


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
		console.log('string: ', foundPage);
		res.render('../views/wikipage', {title: foundPage.title, content: foundPage.content});
	})

	.catch(next);

	// var urlTitle = req.params.urlTitle;
	// res.send(urlTitle);
});
