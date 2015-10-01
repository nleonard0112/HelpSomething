var nonProfits = require('../server/controllers/nonProfits.js');
var alerts = require('../server/controllers/alerts.js');
var contacts = require('../server/controllers/contacts.js');


module.exports = function(app){

	app.post('/add_org', function(req, res){
		nonProfits.add(req, res);
	});

	app.get('/get_organizations', function(req, res){
		nonProfits.show(req, res);
	});

	app.post('/edit_org', function(req, res){
		nonProfits.edit(req, res);
	});

	app.post('/delete_org', function(req, res){
		nonProfits.remove(req, res);
	});

	app.post('/add_phone', function(req, res){
		contacts.add(req, res);
	});

	app.post('/blast_message', function(req, res){
		contacts.blast(req, res);
	});

	app.get('/get_alert', function(req, res){
		alerts.show(req, res);
	});


};
