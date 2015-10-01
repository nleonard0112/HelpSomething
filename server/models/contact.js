var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	phone_number: String,
	created_at: String
});

mongoose.model('Contact', ContactSchema);