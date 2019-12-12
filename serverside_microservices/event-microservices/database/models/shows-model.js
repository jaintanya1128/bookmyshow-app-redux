const mongoose = require("../dbconnection");
const showsSchema = require("../schemas/shows-schema");

module.exports = mongoose.model("Shows", showsSchema);
