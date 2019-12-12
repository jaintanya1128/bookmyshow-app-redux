const mongoose = require("../dbconnection");
const Schema = mongoose.Schema;

module.exports = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true, unique: true },
  location: {
    type: String,
    required: true,
    trim: true,
    enum: ["ncr", "delhi", "noida", "gurgaon", "gaziabad", "greater noida"]
  },
  address: { type: String, required: true, trim: true },
  halls: {
    type: [require("../schemas/hall-schema")],
    required: true,
    trim: true
  },
  totalhallcount: {
    type: Number,
    validate: {
      validator: function(v) {
        return v === this.halls.length;
      },
      message: "the count must be equal to halls added"
    },
    trim: true,
    min: 1
  }
});
