const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      user_name: { type: String, required: true },
      user_email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      }
    },
    booked_show: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);
