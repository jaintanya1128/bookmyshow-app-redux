const mongoose = require("../dbconnection");
const bookingSchema = require("../schemas/booking-schema");

module.exports = mongoose.model("Booking", bookingSchema);
