'use strict';
/*jslint node: true */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var questionSchema = new Schema({
	question: String,
	answers: Array,
	trueanswer: Array,
	type: String,
	create_date:new Date()
});

module.exports = mongoose.connection.model('questions',questionSchema);