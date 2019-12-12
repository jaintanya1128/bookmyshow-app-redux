const mongoose = require('../dbconnection');
const movieSchema = require('../schemas/movie-schema');

module.exports = mongoose.model('Movies', movieSchema);
