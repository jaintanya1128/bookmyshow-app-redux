const mongoose = require('../dbconnection');
const hallSchema = require('../schemas/hall-schema');

module.exports = mongoose.model('Halls', hallSchema);
