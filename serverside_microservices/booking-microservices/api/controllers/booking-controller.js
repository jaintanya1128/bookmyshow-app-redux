const bookingModel = require("../../database/models/booking-model");
const mongoose = require("../../database/dbconnection");

exports.bookings_create_booking = (req, res, next) => {
  const booking = new bookingModel({
    _id: new mongoose.Types.ObjectId(),
    user: {
      user_name: req.body.user_name,
      user_email: req.body.user_email
    },
    booked_show: req.body.show_id
  });

  booking
    .save()
    .then(result => {
      //console.log(result);
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "saved booking details"
      });
    })
    .catch(err => {
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};

exports.bookings_update_booking = (req, res, next) => {
  res.status(200).json({ message: "success" });
};

exports.bookings_delete_booking = (req, res, next) => {
  res.status(200).json({ message: "success" });
};

exports.bookings_get_booking = (req, res, next) => {
  const id = req.params.id;

  res.status(200).json({ message: "success" });
};

exports.bookings_get_all = (req, res, next) => {
  res.status(200).json({ message: "success" });
};
