const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking-controller");

//save a booking complete detail
router.post("/", bookingController.bookings_create_booking);

//update a booking
router.patch("/:id", bookingController.bookings_update_booking);

//delete a booking
router.delete("/:id", bookingController.bookings_delete_booking);

//get a booking complete detail
router.get("/:id", bookingController.bookings_get_booking);

//get all bookings
router.get("/", bookingController.bookings_get_all);

// //get all bookings based on movie
// router.get('/movie/:id', bookingController.bookings_get_all_bymovie);

// //get all bookings based on date
// router.get('/date/:date', bookingController.bookings_get_all_bydate);

// //get all bookings based on theater
// router.get('/theater/:id', bookingController.bookings_get_all_bytheater);

// //get all bookings based on movie and theater
// router.get('/movietheater/:movieid/:theaterid', bookingController.bookings_get_all_bymovietheater);

module.exports = router;
