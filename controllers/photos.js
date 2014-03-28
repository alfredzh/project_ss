/*
 * GET photos page.
 */

module.exports = function(req, res){

	users.find({},function(err,doc){
		//error handler
		if(err) console.log(err)
		//render page
		res.render('index', { title: doc._id });
	});
};