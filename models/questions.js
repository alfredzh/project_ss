'use strict';
/*jslint node: true */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var questionSchema = new Schema({
	question: String,
	answers: Array,
	trueanswer: Array,
	type: String,
    random: Number
});

module.exports = mongoose.connection.model('questions',questionSchema);