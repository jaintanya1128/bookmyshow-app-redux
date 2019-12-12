const mongoose = require("../dbconnection");
const theaterSchema = require("../schemas/theater-schema");

module.exports = mongoose.model("Theaters", theaterSchema);
