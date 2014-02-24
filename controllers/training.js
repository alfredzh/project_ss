'use strict';
/*jslint node: true */

var question = require('../models/questions');

exports.showTraining = function(req,res){
	question.find({},function(err,docs){
		if(err) throw err;
		res.render('show_training',{questions:docs});
	});
}