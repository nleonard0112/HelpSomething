var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = express();
var upload = multer({ dest: './client/uploads/'});

app.use(express.static(path.join(__dirname, "./client")));
app.use(bodyParser.json());

app.use(multer({ dest: './client/uploads/',
	rename: function (fieldname, filename) {
		return filename+Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
	});
});


require('./config/mongoose.js');
require('./config/routes.js')(app);

app.listen(8765, function(){

	console.log("Running on 8765");

});