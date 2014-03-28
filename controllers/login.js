'use strict';
/*jslint node: true */

exports.checkLogin = function(req,res,next){
	//next();//temp for test
	if( req.session.auth
		&& req.session.auth.userid == 'tycc_ss' 
		&& req.session.auth.ip == req.connection.remoteAddress
		&& req.session.auth.useragent == req.headers['user-agent']){
			next();
	}else{
		res.redirect('/login');
	}
};

exports.doLogin = function(req, res){
	var userid = req.body.userid,
		password = req.body.userpwd;
		//email = req.body.email;

	//var md5 = crypto.createHash('sha1');
	//password = md5.update(password).digest('base64');

	if(userid == 'tycc_ss' && password == 'TYCC_ss_0192'){
		req.session.auth = {
			userid:req.body.userid,
			ip:req.connection.remoteAddress,
			useragent:req.headers['user-agent']
		}
		res.json('success');
	}

	//users.findOne({userid:userid,password:password},function(err,docs){
		//error handler
		//if(err) throw err;

		//if(!docs) {
		//	res.json('error');
		//}else{
			// req.session.auth = {
			// 	userid:req.body.userid,
			// 	ip:req.connection.remoteAddress,
			// 	useragent:req.headers['user-agent']
			// }
			// res.json('success');
		//}
	//});
};

exports.login = function(req, res){
	if( req.session.auth
		&& req.session.auth.userid == 'tycc_ss' 
		&& req.session.auth.ip == req.connection.remoteAddress
		&& req.session.auth.useragent == req.headers['user-agent']){
			res.render('/');
	}else{
		res.render('login');
	}
};

exports.doLogout = function(req, res){
	req.session.auth = null;
	res.redirect('/login');
};