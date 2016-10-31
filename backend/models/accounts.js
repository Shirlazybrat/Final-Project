var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema ({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	token: String,
	calendarId: String,
	name: String,
	wed_date: String,
	location: String,
	budget: Number,
	orders: {
		item: String,
		amount: Number,
		total: Number,
		date: Number
		}
	});

module.exports = mongoose.model('Account', Account);

 // Use node mailer to outomate the orders to her email- https://nodemailer.com/