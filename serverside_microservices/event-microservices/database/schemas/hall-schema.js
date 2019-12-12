const mongoose = require("../dbconnection");

const Schema = mongoose.Schema;

module.exports = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hall_name: String,
  screen_size: String,
  total_rows: Number,
  total_columns: Number
});
