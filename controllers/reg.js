'use strict';
/*jslint node: true */

var crypto = require('crypto');
var users = require('../models/users');
var icode = require('../models/icode');

exports.reg = function(req, res){
	if( req.session.auth
		&& req.session.auth.userid != '' 
		&& req.session.auth.ip == req.connection.remoteAddress
		&& req.session.auth.useragent == req.headers['user-agent']){
			res.render('reg');
	}else{
		res.redirect('/');
	}
};

exports.doReg = function(req, res){
	var account = req.body.userid,
		password = req.body.userpwd,
		email = req.body.email,
		code = req.body.code;

	if(!icode || !account || !password || /*!email ||*/ !/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){3,19}$/.exec(account) || !/^(\w){6,20}$/.exec(password) /*|| !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)*/){
		res.json('注册失败！');
	}else{
		icode.findOne({icode:code},function(err,data){
			if(err) throw err;
			
			if(typeof data != undefined){
				users.findOne({userid:account},function(err,data){
					if(err) throw err;
					if(data){
						res.json('账号已注册');
					}else{
						var md5 = crypto.createHash('sha1');
						password = md5.update(password).digest('base64');
						var newUser = new users ({
							userid:account,
							password:password,
							createdate:Date.now()
						});
						newUser.save(function(err){
							if(err) throw err;
							req.session.auth = {
								user:req.body.username,
								ip:req.connection.remoteAddress,
								useragent:req.headers['user-agent']
							}
							res.json('success');
						});
					}
				});
			}else{
				res.json('code错误！');
			}
		});
	}
};