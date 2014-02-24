
/*
 * GET home page.
 */

exports.showIndex = function(req, res){
  res.render('index', { title: 'Express' });
};