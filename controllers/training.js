'use strict';
/*jslint node: true */

var question = require('../models/questions');

exports.startTraining = function(req,res){
  //question.findOne({}, {"$slice": [Math.floor(count*Math.random()), 1]});

  var rand = Math.random();
  question.findOne( { random : { $gte : rand } },function(err,docs){
  	console.log(rand)
    if ( docs == null ) {
      question.findOne( { random : { $lte : rand } },function(err,docs){
      	res.render('training',{questions:docs});
      });
    }else{
      res.render('training',{questions:docs});
    }
  });

  // question.find({},function(err,docs){
  //   if(err) throw err;
  //   res.render('show_question',{questions:docs});
  // });
}