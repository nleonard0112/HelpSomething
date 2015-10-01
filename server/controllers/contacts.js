var twilio = require('twilio');
var client = new twilio.RestClient('ACe83ae54f14daf244e93cc549cc99d193', 'd993f4738b4809fb006fa8ac1f4731c1');


// var twilio = require('twilio')('ACe83ae54f14daf244e93cc549cc99d193', 'd993f4738b4809fb006fa8ac1f4731c1');
var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');
var Alert = mongoose.model('Alert');

module.exports = (function(){

	return {
		add: function(req, res){

			var new_phone = new Contact({
				phone_number: req.body.phone_number,
				created_at: req.body.created_at

			});


			new_phone.save(function(err, data){

				if(err){
					console.log(err);
					console.log('Err saving new phone!');
				}

				else {
					console.log('it worked!!!!!');
					res.redirect('/get_organizations');
				}
			});
		},


		show: function(req, res){

			Alert.find({}, function(err, alerts){
				if(err){
					console.log(err);
					console.log('Err getting product!');
				}

				else {
					res.json(alerts);
				}
			});
		},


		// comment: function(req, res){

		// 	console.log(req.body);
		// 	Contact.update({product_name: req.body.product_name}, {$push: {comment: {comment: req.body.comment, user: req.body.user, posted_at: new Date()}}}, function(err, products){
		// 		if(err){
		// 			console.log(err);
		// 			console.log('Err removing didnt work!');
		// 		}

		// 		else {
		// 			res.redirect('/get_products');
		// 		}
		// 	});
		// },

		blast: function(req, res){
			
			Alert.update({alert_name: "alert"}, {$set: {alert_message: req.body.about, alert_url: req.body.url}}, function(err, products){
				if(err){
					console.log(err);
					console.log('Err updating didnt work!');
				}

				else {
					console.log('Added to database');
				}
			});

	
			Contact.find({}, function(err, number){

				console.log(number.phone_number);
				console.log(number);
				
				for(var i = 0; i < number.length; i++){
					client.sms.messages.create({
					    to:"+1" + number[i].phone_number,
					    from:'15742630110',
					    body: req.body.name + ": " + req.body.about + " " + req.body.url,
					}, 

					function(error, message) {
				 
					    if (!error) {
					        console.log('Success! The SID for this SMS message is:');
					        console.log(message.sid);
					 
					        console.log('Message sent on:');
					        console.log(message.dateCreated);
					    } else {
					        console.log('Oops! There was an error.');
					    }
					});
				}
			});
		}
	};
})();