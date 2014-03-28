'use strict';
/*jslint node: true */

//get models
var users = require('../models/users');
var topics = require('../models/topics');

exports.showTopic = function(req, res){
	var page;
	var start;
	var pageSize = 10;
	if(typeof req.params.page == 'number'
		&& req.params.page > 1){
		page = req.params.page;
	}else{
		page = 1;
	}
	start = (page - 1) * pageSize;

	topics.find().sort({_id: -1}).skip(start).limit(pageSize).exec(function(err,docs){
		if(err) throw err;
		//time format
		if(docs){
			for(var i=docs.length-1;i>-1;i--){
				var year = docs[i].createdate.getFullYear(),
					month = docs[i].createdate.getMonth() + 1,
					date = docs[i].createdate.getDate();
				docs[i].createdatereformat = year + '年' + month + '月' + date + '日';
			}
			res.render('topic', { topics : docs });
		}
	});
};

exports.createTopic = function(req, res){
	var account = req.session.auth.userid,
		topicTitle = req.body.posttitle,
		topicContent = req.body.posttext;

		users.find({userid:account},function(err, docs){
			if(err) throw err;
			var nickname = docs.nickname,
				headicon = docs.headicon;

			if(docs.length > 0){
				var newTopic = new topics({
					creator:account,
					topictitle:topicTitle,
					topiccontent:topicContent,
					headicon:headicon,
					createdate:Date.now()
				});
				newTopic.save(function(err){
					if(err) throw err;
					res.redirect('/topic');
				});
			}else{
				res.redirect('/login');
			}
		});
};

exports.showTopicDetail = function(req, res){
	var topicid = req.params.topicid;
	topics.find({ _id:topicid },function(err,docs){
		if(err) throw err;
		if(docs) {
			console.log(docs)
			res.render('topic_detail',{topic_detail:docs});
		}else{
			next();
		}
	});
}

exports.showCreateTopic = function(req, res){
	res.render('create_topic');
};

