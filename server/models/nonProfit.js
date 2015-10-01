var mongoose = require('mongoose');

var NonProfitSchema = new mongoose.Schema({
	name: String,
	country: String,
	cause: String,
	description: String, 
	url: String,
	clicked: Number,
	created_at: String
});

mongoose.model('NonProfit', NonProfitSchema);