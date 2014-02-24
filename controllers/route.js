'use strict';
/*jslint node: true */

var index = require('./index');
var login = require('./login');
var add = require('./add');
var question = require('./question');

exports.routeSettings = function(app){
	app.get('/', login.checkLogin, index.showIndex);
	app.get('/login', login.login);
	app.get('/add', login.checkLogin, add.showAddQuestion);
	//app.get('/edit', login.checkLogin, function(req,res){res.render('edit',{title:"ss"});});
	app.get('/exam', login.checkLogin, function(req,res){res.render('exam',{title:"ss"});});
	app.get('/training', login.checkLogin, function(req,res){res.render('training',{title:"ss"});});
	app.get('/show_question', login.checkLogin, question.showQuestion);
	
	app.post('/dologin', login.doLogin);
	app.get('/dologout', login.doLogout);

	app.post('/add_question', login.checkLogin, add.doAddQuestion);

	app.all('*', function(req,res){
		res.send('404');
	});
};
