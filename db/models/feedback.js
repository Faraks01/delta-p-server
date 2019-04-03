const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model
const FeedbackSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	message: String,
	date: String
});

const Feedback = mongoose.model("feedback", FeedbackSchema);

module.exports = Feedback;
