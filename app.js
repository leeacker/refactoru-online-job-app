var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Applicant = require('./models/applicants.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/kewlandkompany');

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){

	Applicant.find({}, function(err, result){

		res.render('applicants', {
			applicants: result
		});
	});
	
});

// creates and applicant
app.post('/applicant', function(req, res){
	var	bodyData = req.body;
	bodyData.skills = bodyData.skills.split(',');
	var newApplicant = new Applicant(bodyData);

	newApplicant.save(function(err, result){
		res.redirect('/success');
	});
	

	// Here is where you need to get the data
	// from the post body and store it in the database
	
});
app.get('/success', function(req, res){
	res.render('success');
});

app.get('/delete/:applicantID', function(req, res){
	var applicantID = req.params.applicantID;

	Applicant.remove({_id : applicantID}, function(err, result){
		res.redirect('/applicants');
	});
});

app.get('/:applicantID', function(req, res){
	var user = req.params.applicantID;
	console.log(user);
	Applicant.find({_id : user}, function(err, result){
		var currentUser = result;
		console.log(currentUser);
		res.render('applicantInfo', { 
			userObject : currentUser
		});
	});
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
