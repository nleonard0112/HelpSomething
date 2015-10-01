var mongoose = require('mongoose');

var AlertSchema = new mongoose.Schema({
	alert_name: String,
	alert_message: String,
	alert_url: String,
	created_at: String
});

mongoose.model('Alert', AlertSchema);