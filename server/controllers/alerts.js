var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');

module.exports = (function(){

	return {

		add: function(req, res){
			var new_order = new Order(req.body);

			new_order.save(function(err, data){

				if(err){
					console.log(err);
					console.log('Err saving new order!');
				}

				else {
					res.redirect('/get_orders');
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
		}




	};

})();