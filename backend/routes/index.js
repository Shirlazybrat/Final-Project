var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://127.0.0.1:27017/final";
mongoose.connect(mongoUrl);
var Account = require('../models/accounts');
var randToken = require('rand-token'),uid;

//this is our config module we have access to
//configVars.secretTestKey
// var configVars = require('../config/config'); 

//include bcrypt
var bcrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


router.post('/register_user', function(req,res,next){
//to check if the username is already used...
		// {username: req.body.username}, //This is the droid we're looking for
		// function(error, document){
	
		// 	if (document == null){
		// 	}
		// 	else {

	if (req.body.password != req.body.password_confirm){
		res.json({
			message: "passmatch"
		});
	}
	else {
		var token = randToken.generate(32);
		var newAccount = new Account({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			email: req.body.email,
			name: req.body.name,
			wed_date: req.body.wed_date,
			location: req.body.location,
			budget: req.body.budget,
			token: token
});

	newAccount.save(function(error, documentAdded){
		if(error){
			res.json({
				message: "errorAdding"
			});
		}
		else{
			res.json({
			message: "added",
			token: token
			//add tokenExpDate
			});
		}
	});	
}
//@ post('/register'), do aAccount.find({username: req.body.username}).
//If the result is not null, res.json({failure: 'usernameTaken'), })
});

router.post('/createCalendar', function(req,res,next){
	Account.update(
		{token: req.body.token},
		 {calendarId: req.body.calendarID},
		 function(error, document){
		 	if (error){
				//no match
				res.json({failure: error});
			}else{
				res.json({
					success: "calendar added"
				});
			}
		 });
})


router.post('/login', function(req,res,next){
	Account.findOne(
		{username: req.body.username}, //This is the droid we're looking for
		function(error, document){
			//document is returned from the mongo query
			//document will have a property for each field.
			//we need to check the pw field in the db against the hashed bcrypt version
			if (document == null){
				//no match
				res.json({failure: "noUser"});
			}
			else {
				//run compare sync. first param is the english pw, secon param is the hash
				//it will return true if equal, false if not
				var loginResult = bcrypt.compareSync(req.body.password, document.password);
				if(loginResult){
					//the password is correct. login allowed
					res.json({
						success: "userFound"
					});
				}
				else{
					//hashes did not match or the doc wasn't found
					res.json({
						failure: "badPass"
					});
				}
			}
		}
	)
});


//logout function
// --$cookies.put('token', '');
// -- $cookies.remove('token');

router.get('/getCalendarID', function(req,res,next){
	console.log(req.query);

	var userToken = req.query.token; // the XXX in ?token=[XXX]
	if(userToken == undefined){
		//no token was supplied
		res.json({failure: "noToken"});
	}
	else {
		Account.findOne(
			{token: userToken}, //this is the droid we're looking for
			function(error, document){
				// console.log(document.calendarId);
				if(document == null){
					//this token is not in the system
					res.json({failure: 'badToken'}); //
				}
				else{
					res.json({
						username: document.username,
						email: document.email,
						calendarID: document.calendarId
					});
				}
			}
		)
	}
});
module.exports = router;