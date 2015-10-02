var nonProfits = require('../server/controllers/nonProfits.js');
var alerts = require('../server/controllers/alerts.js');
var contacts = require('../server/controllers/contacts.js');
// var Upload = require('upload-file');
var multer  = require('multer');
var upload = multer({ dest: './client/uploads/'});

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

	app.post('/delete_contact', function(req, res){
		console.log("made it to routes");
		contacts.remove(req, res);
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

	app.get('/get_contacts', function(req, res){
		contacts.show_contacts(req, res);
	});

	// app.use(multer({ dest: './client/uploads/',
	// 	rename: function (fieldname, filename) {
	// 		return filename+Date.now();
	// 	},
	// 	onFileUploadStart: function (file) {
	// 		console.log(file.originalname + ' is starting ...');
	// 	},
	// 	onFileUploadComplete: function (file) {
	// 		console.log(file.fieldname + ' uploaded to  ' + file.path)
	// 	}
	// }));

	// app.post('/api/photo',function(req,res){
	// 	upload(req,res,function(err) {
	// 		if(err) {
	// 			return res.end("Error uploading file.");
	// 		}
	// 	});
	// });


};
