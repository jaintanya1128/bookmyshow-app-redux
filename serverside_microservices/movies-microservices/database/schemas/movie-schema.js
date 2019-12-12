const mongoose = require('../dbconnection');
const Schema = mongoose.Schema;

module.exports = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true, unique: true },
	desc: { type: String, required: true },
	category: { type: [String], required: true },
	lang: { type: String, required: true },
	duration: { type: Number },
	avg_rating: { type: Number, min: 0 },
	voting_count: { type: Number },
	release_date: { type: Date, required: true },
	cast: { type: [String] },
	poster_path: { type: String, required: true },
	status: { type: String, required: true }
});
