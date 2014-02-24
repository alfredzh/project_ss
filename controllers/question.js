'use strict';
/*jslint node: true */

var question = require('../models/questions');

exports.showQuestion = function(req,res){
	question.find({},function(err,docs){
		if(err) throw err;
		console.log(docs._id.getTimestamp())
		res.render('show_question',{questions:docs});
	});
}