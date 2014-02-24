'use strict';
/*jslint node: true */

var question = require('../models/questions');

exports.doAddQuestion = function(req,res,next){
	
// question:req.body.question,
// 		answer:req.body.options,
// 		trueanswer:req.body.radio

	var newQuestion = new question ({
		question:req.body.question,
		answers:req.body.answers,
		trueanswer:req.body.trueanswer,
		type:req.body.type,
		modifydate:new Date()
	});
	newQuestion.save(function(err){
		if(err) throw err;
		res.json('success');
	});
}

exports.showAddQuestion = function(req,res,next){
	res.render('add',{title:"ss"});
}