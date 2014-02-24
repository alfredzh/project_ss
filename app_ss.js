
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('@5%s2hghh'));
app.use(express.session());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// production only
if ('production' == app.get('env')) {
	console.log('production mode');
}

//global db connection
var dboptions = require('./db/dbsettings').settings;
	mongoose.connect(dboptions.dbaddress,dboptions.options);

//routers
var routeCtrl = require('./controllers/route').routeSettings;
	routeCtrl(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
