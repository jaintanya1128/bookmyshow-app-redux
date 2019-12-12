const mongoose = require("mongoose");
const config = require("../config.json");

mongoose.connect(config.connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on("error", console.error.bind(console, "mongodb connection error:"));
db.once("open", function() {
  console.log("mongodb is connected successfully");
});

module.exports = mongoose;
