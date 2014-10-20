var mongoose = require('mongoose');

var applicantsSchema = mongoose.Schema({
	name: String,
	bio: String,
	skills: Array,
	years: Number,
	why: String
});

module.exports = mongoose.model('applicant', applicantsSchema);