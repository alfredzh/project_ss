'use strict';
/*jslint node: true */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	userid: {type:String, unique: true },
	nickname: String,
	password: String,
	headicon: String,
	adminlevel: Number,
});

module.exports = mongoose.connection.model('users',userSchema);