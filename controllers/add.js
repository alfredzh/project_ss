'use strict';
/*jslint node: true */

var question = require('../models/questions');

exports.addQuestion = function(req,res,next){
	
// question:req.body.question,
// 		answer:req.body.options,
// 		trueanswer:req.body.radio

	var newQuestion = new question ({
		question:req.body.question,
		answers:req.body.answers,
		trueanswer:req.body.trueanswer,
		type:req.body.type,
		random:Math.random()
	});
	newQuestion.save(function(err){
		if(err) throw err;
		res.json('success');
	});
}