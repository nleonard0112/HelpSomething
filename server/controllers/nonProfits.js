var mongoose = require('mongoose');
var NonProfit = mongoose.model('NonProfit');

module.exports = (function(){

	return {
		add: function (req, res){
			var new_org = new NonProfit(req.body);

			new_org.save(function(err, data){

				if(err){
					console.log(err);
					console.log('Err saving new org!');
				}

				else {
					console.log("It worked!!!");
					res.redirect('/get_organizations');
				}
			});
		},

		show: function(req, res){
			NonProfit.find({}, function(err, organizations){
				if(err){
					console.log(err);
					console.log('Err getting organizations!');
				}

				else {
	
					res.json(organizations);
				}
			}).sort( { name: 1 });
		},

		edit: function(req, res){

			NonProfit.update({_id: req.body._id}, {$set: {cause: req.body.cause, country: req.body.country, url: req.body.url, description: req.body.description}}, function(err, products){
				if(err){
					console.log(err);
					console.log('Err removing didnt work!');
				}

				else {
					console.log(req.body.cause);
					console.log('Added to database');
					res.redirect('/get_organizations');
				}
			});



		},

		remove: function(req, res){
			NonProfit.remove({_id: req.body._id}, function(err, organizations){
				if(err){
					console.log(err);
					console.log('Err removing didnt work!');
				}

				else {
					console.log('Org Deleted');
					res.redirect('/get_organizations');
				}
			});
		}
	};
})();